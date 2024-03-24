library(tidyverse)
library(jsonlite)

d_bger <- read_rds(file = "bger-2023-5.rds")  # File path needs to be defined!

json_bger <- d_bger %>% select(docref, date, outcome, length, leading_case, app_represented, area_general, proc_duration) %>% 
  mutate(leading_case = if_else(is.na(leading_case), FALSE, TRUE),
         area_general = fct_recode(area_general, o = "Öffentliches Recht",
                                       p = "Privatrecht", s = "Strafrecht"),
         outcome = fct_recode(outcome, g = "granted",
                              p = "partly granted",
                              i = "inadmissible",
                              r = "rejected",
                              w = "writeoff"),
         duration_raw = round(log(proc_duration) * 1000, 0),
         duration = if_else(duration_raw < 0, 0, duration_raw)) %>% 
  filter(is.na(area_general) == FALSE) %>% 
  filter(is.na(app_represented) == FALSE) %>% 
  filter(is.na(outcome) == FALSE) %>% 
  filter(is.na(duration) == FALSE) %>% 
  select(docref, date, length, outcome, leading_case, app_represented, area_general, duration) %>% 
  rename(size = "length", colour = "outcome")

exportJSON <- toJSON(json_bger)
write(exportJSON, "bubbles.json")

# summary(json_bger$duration)  # Mean is 4800
