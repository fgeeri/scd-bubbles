## `scd-bubbles` 🫧
`scd-bubbles` is an open source web app that visualises the decisions of the Swiss Federal Court 🇨🇭🏛. Every judgments is represented by a bubble, with the properties of the bubbles reflecting information about the case 🫧.

Bubbles appear in chronological order of the decision date, and their color indicates the case outcome. Bubble size represents the length of the judgment text.

`scd-bubbles` is a fun way to gain an understanding of the caseload that the Swiss Federal Court is dealing with and conveys in a very broad sense information about the decisions taken in a (dis-)aggregated from. It is also suitable for meditative practices.

## Data
The data used is based on the [Swiss Federal Supreme Court Dataset](https://zenodo.org/records/10634296) (*F. Geering and J. Merane, "Swiss Federal Supreme Court Dataset (SCD)". Zenodo, 2023–2024. doi: 10.5281/zenodo.10634296*). Using the `data_preparation.R` script, the dataset is pre-processed for visualisation and converted to JSON, while reducing the file size by eliminating unneeded variables.

The resulting `bubbles.json` data has the following structure:
```
{"docref":"1B_8/2007","date":"2007-02-28","size":13874,"colour":"r","leading_case":false,"app_represented":true,"area_general":"s","duration":3989}
```

`docref` is a string that contains the judgment identifier.

`date` is a date in YYYY-MM-DD format that contains the decision date of the judgment in the format YYYY-MM-DD.

`size` is an integer that contains the length of the judgment text in characters.

`colour` is a single character representing the judgment outcome: `g` = granted, `p` = partly granted, `r` = rejected, `i` = inadmissible, `w` = writeoff.

`leading_case` is a boolean that indicates if the judgment was published as leading case.

`app_represented` is a boolean that indicates if the appellant was represented by a lawyer.

`area_general` is a single character representing the area of law: `s` = strafrecht, `o` = oeffentliches recht, `p` = privatrecht.

`duration` is an integer between 0 and 8948, representing the log of the duration of proceedings, multiplied by 1000.
