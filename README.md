# plotly_challenge

## Webpage Layout
The page is broken down into 4 main blocks.
1. <strong>Selector and Demographics</strong>: The user selects an option from the dropdown menu and can then observe the subject's demographic information.  
2. <strong>Most Prevalent Strains</strong>: The second block is the horizontal bar chart directly adjacent to the first section. This chart displays up to the top ten most prevalent species present in the subject's bellybutton. Some subjects had fewer than 10 species and as a result their plots will only display that number of species along with the magnitude of the signal that was observed from their sample.
3. <strong>Washing Frequency</strong>: The third block is a gauge chart which visualizes the washing frequency for the subject (the number of times they wash their belly buttons per weeks).
4. <strong>Species Bubble Plot</strong>: The final block is below the first three and displays all of the species along with their observed prevalence. The x axis is their OTU ID (a bacterial classificatino number) and the Y axis is the observed prevalence. The size of the bubbles is related to their prevalence and the color of the bubble is relative to their position on the x axis.

Source of the Data: <a href = "http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/"> Belly Button Dataset</a>
