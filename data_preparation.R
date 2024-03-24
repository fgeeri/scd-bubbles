library(tidyverse)
library(jsonlite)

# d_bger <- read_rds(file = "")  # File path needs to be defined!

json_bger <- d_bger %>% select(docref, date, outcome, length, leading_case, app_represented, area_general) %>% 
  mutate(leading_case = if_else(is.na(leading_case), FALSE, TRUE),
         area_general = fct_recode(area_general, o = "Öffentliches Recht",
                                       p = "Privatrecht", s = "Strafrecht"),
         outcome = fct_recode(outcome, g = "granted",
                              p = "partly granted",
                              i = "inadmissible",
                              r = "rejected",
                              w = "writeoff")) %>% 
  filter(is.na(area_general) == FALSE) %>% 
  filter(is.na(app_represented) == FALSE) %>% 
  filter(is.na(outcome) == FALSE) %>% 
  select(docref, date, length, outcome, leading_case, app_represented, area_general) %>% 
  rename(size = "length", colour = "outcome")

exportJSON <- toJSON(json_bger)
write(exportJSON, "bubbles.json")
