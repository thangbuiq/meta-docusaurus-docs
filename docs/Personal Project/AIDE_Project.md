
# COVID-19 ETL Data Pipeline with Dagster, Spark, and Plotly

> A Data Engineering Project in ”Fundamental Data Enginnering” Course - AIDE Institute Thang Bui Q. University of Science (VNUHCM-US) May 31, 2023

## Data Flow Diagram 

![](img/Aspose.Words.f779564d-f3c7-41c6-a9f9-f1fc6f7113f3.004.png)

## Collecting data

- Time-series data (date-by-date), clean above 80%.
- Git-repo: https://github.com/CSSEGISandData/COVID-19

![](img/Aspose.Words.f779564d-f3c7-41c6-a9f9-f1fc6f7113f3.005.png)

## Explore Dataset
:::info covid19_cases_position.csv
RAW Lat/Long wise no. of cases
:::

:::info covid19_country_wise.csv
RAW country level no. of cases
:::

:::info covid19_time_series.csv
RAW Date wise no. of cases
:::

:::info covid19_worldometer.csv
RAW Worldometers data (has Continent info)
:::

## Project Goal (WHO Spreadmap)

![](img/Aspose.Words.f779564d-f3c7-41c6-a9f9-f1fc6f7113f3.010.png)

## Design database for Covid19 

We need to initialize the schemas for the RAW data in MySQL with the 4 tables (as 4 csv files). Then, we need to create clean tables with aggregated and filtered data for silver layer from 4 assets. And create two tables at last in gold layer:

1. **covid19_daily_stats**
1. **covid19_continent_stats**

## Sample SQL Script For MySQL Schemas

:::danger 
Doing the same things with 3 others 
:::

```sql
DROP TABLE IF EXISTS covid19_time_series;
CREATE TABLE covid19_time_series (
    `date` date,
    country_region varchar(64),
    confirmed int4,
    deaths int4,
    recovered int4,
    active int4,
    new_cases int4,
    new_deaths int4,
    new_recovered int4,
    who_region varchar(64),
CONSTRAINT PK_covid19_timeseries PRIMARY KEY(`date`, `country_region`)
);

LOAD DATA LOCAL INFILE /tmp/covid19-clean/covid19_time_series.csv 
INTO TABLE covid19_time_series FIELDS TERMINATED BY LINES, TERMINATED BY IGNORE 1 ROWS;
```

## ETL Data Pipeline with Dagster, Spark, and Plotly

### Concepts of covid19_daily_stats

This asset will provide **daily** statistics for each country, including confirmed cases, deaths, and recoveries (**with latitude and longtitude**). It will join data from the `covid19_cases_position` and `covid19_time_series` tables.

### Concepts of covid19_continent_stats

This asset will provide statistics **by continent**, including **total** confirmed cases, deaths, and recoveries. It will join data from the `covid19_country_wise` and `covid19_worldometer` tables.

> What’s handle the output of Spark DataFrame and Spark (with spark-master and 2 spark-workers with 2 CORES CPU 4GB RAM)?

### Design IO Manager for Spark

Connecting MinIO to it and handling the output of a Pandas DataFrame, **`spark_io_manager`** use the Hadoop S3A connector to read and write data to **MinIO**. The IO Manager use the Spark DataFrame APIs in Spark to manipulate and transform the data as needed, and then convert it to a Pandas DataFrame using the **`spark.sql(sql_stm).toPandas()`** method.

:::danger

Install right Python and Java version for etl-pipeline 

Spark need Python <= **3.9.16** and Java **17** to work right. Don’t forget to add dagster-spark==0.18.6 and pyspark==3.3.2 in your **requirements.txt**.
:::

```docker
FROM python:3.9.16-slim
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
USER root

RUN apt-get update --yes && \
    apt-get install --yes --no-install-recommends \ "openjdk-17-jre-headless" \
    ca-certificates-java && \
    apt-get clean &&rm -rf /var/lib/apt/lists/\* \
    pip install --upgrade pip &&pip install -r requirements.txt
```

### Sample Asset Code Using Spark IO Manager

```python
@asset(
    ins = {"table" : AssetIn(key_prefix = ["bronze"])}, key_prefix=["silver"],
    io_manager_key="spark_io_manager",
    compute_kind="PySpark"
)
def sample_asset(context, pandas_data: pd.DataFrame) -> Output[pd.DataFrame]:
    spark = connect()
    spark_data = spark.createDataFrame(pandas_data) spark_data.createOrReplaceTempView("data")
    sql_stm = "SELECT * FROM data;"
    sparkDF = spark.sql(sql_stm)
    pd_data = sparkDF.toPandas()
    return Output(pd_data)
```
### Dagster Dagit - ETL 

- Full view of COVID-19 Data Lineage (EXTRACT - TRANSFORM - LOAD)

![](img/Aspose.Words.f779564d-f3c7-41c6-a9f9-f1fc6f7113f3.020.png)

### Extract - Transform

- Extract data from MYSQL Database.
- Transform by SPARK and load them into SILVER layer.

![](img/Aspose.Words.f779564d-f3c7-41c6-a9f9-f1fc6f7113f3.021.png)

### Transform - Load

- Transform by SPARK and load them into GOLD layer.
- Host Plotly by Dash, also load data into PostgreSQL Database.

![](img/Aspose.Words.f779564d-f3c7-41c6-a9f9-f1fc6f7113f3.022.png)

## Mining before doing the final step 
![](img/Aspose.Words.f779564d-f3c7-41c6-a9f9-f1fc6f7113f3.029.png)

It seems like you’re planning to plot some data using Plotly and host it with Dash. But you’re not ready yet? Why not? What do you even have to plot? First, you should focus on getting into the nitty-gritty of data mining and really enjoy it before trying to plot something. So, take a deep dive into

the covid19_daily_stats, get mining and dig up some golden insights before trying to plot anything!

### First look at gold_layer (using J-Lab as testing)

![](img/Aspose.Words.f779564d-f3c7-41c6-a9f9-f1fc6f7113f3.030.png)
### Show the continent gradient table of COVID-19

![](img/Aspose.Words.f779564d-f3c7-41c6-a9f9-f1fc6f7113f3.031.png)

### Plot the spread map of COVID-19 

![](img/Aspose.Words.f779564d-f3c7-41c6-a9f9-f1fc6f7113f3.032.png)

> It’s done! But wait...it’s timeseries!

- How does DS do forecasting? Why you must design gold layer like that?
- Example: (Covid19 Confirmed Cases Rate At Vietnam) - data doesn’t lie
- 16/CT-TTg about quarantine (src: vncdc.gov.vn): 31-03-2020

![](img/Aspose.Words.f779564d-f3c7-41c6-a9f9-f1fc6f7113f3.033.png)

### Concepts of Synthetic Control
```python
data_synth = filter(date < 2020/4/20, continent == "Southest Asia") #With sincere thanks: Minh Man Le (HCMUS)

from sklearn.linear_model import LinearRegression

Y = data_synth["Vietnam"].values # Vietnam

X = data_synth.drop(columns="Vietnam").values # other SA countries
weights_lr = (
    LinearRegression(fit_intercept = False)
        .fit(X,Y)
        .coef_
)
```
> Multiply matrices to make covid_synth_lr

![](img/Aspose.Words.f779564d-f3c7-41c6-a9f9-f1fc6f7113f3.037.png)

### Plot the synthetic control line of Vietnam

![](img/Aspose.Words.f779564d-f3c7-41c6-a9f9-f1fc6f7113f3.038.png)

## Build Dash App with Plotly
```python
%%writefile my_dash_app.py
import dash
import dash_core_components as dcc
import dash_html_components as html
app = dash.Dash(__name__)

#fig_map define
app.layout = html.Div(children=[
    html.Div([
    dcc.Graph(
    id= graph1,
    figure=fig_map
    ),]
)])

if __name__ == __main__ :

app.run_server(debug=True, use_reloader=True)
!python3 ./my_dash_app.py && ngkrok http 8050
```

## Full source code

- See full source code on my Github Repository at thangbuiq/covid19-etl-pipeline: **https://github.com/thangbuiq/covid19-etl-pipeline**
- Or scan this red-thing:

![](img/Aspose.Words.f779564d-f3c7-41c6-a9f9-f1fc6f7113f3.041.png)

## References

- AIDE Institute (2023)

> Fundamental of Data Engineering Slides and Courseworks

- Ong Xuan Hong (2023)

> Medium.com | DataOps 03: Trino + DBT + Spark — Everything Everywhere All at Once

- Eduardo Sarmento (2020)

> Medium.com | How to Create a Simple Dashboard With Plotly
