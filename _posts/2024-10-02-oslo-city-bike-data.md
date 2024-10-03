---
layout: post
title: Oslo City Bike Data Wrangling
frontpage: true
thumb: /img/thumbs/oslo-city-bike-logo.png
overview: "Wheel of Fortune: Will Oslo's City Bike system have a bike when and where you need one?"
---


Oslo has a [City Bike](https://oslobysykkel.no/en) system where, if you have a subscription, you can rent bikes from docks positioned all around the city and ride for up to an hour free of charge. If, for whatever reason, I can’t or don’t want to use my own bike, I find the City Bikes a convenient alternative. With a yearly subscription, using the bikes even a little bit quickly becomes more cost-effective than taking the bus or using those electric scooters that charge by the minute. Plus, you actually have to pedal, so you get a bit of a workout too (and trust me, with Oslo’s hills, you'll feel the burn fast).

{% include image.html url="/img/thumbs/oslo-city-bike-logo.png" description="Oslo City Bike also has a snazzy logo" %}

---

In Norway, the welfare system generously provides you with a kindergarten spot when your child is around one year old. They do not, however, promise it will be nearby. Recently, my daughter started kindergarten about a 30-minute walk from our house.[^1] Furthermore young children sleep in their prams at Norwegian kindergartens, meaning that I have to walk to and from the kindergarten pushing my daughter in her pram and can't bike up there with her on the back.

So, in the mornings, I’d love to grab a bike and cruise downhill all the way home after dropping her (and the pram) off. In the afternoons, I’d be delighted to save some time (and work my glutes) biking back up to pick her up before we enjoy some quality time walking home together.

If only there some system of bicycles for this purpose within the city. Maybe some sort of *City Bike*?

---

One challenge with the City Bike system is that bikes need to be picked up and dropped off at designated stations. This leads to two common problems:

1. You arrive at a station, ready to ride, but there are no bikes available.
2. You bike to a station, ready to park, but there’s no room to dock your bike.

In my experience, stations further from the city center (and higher up the hills) tend to have fewer bikes but plenty of parking, while centrally located stations suffer from the opposite issue.[^3] After a few frustrating experiences—finding an empty station when I need a bike or a full one when I need to park—I started wondering: *How likely is it that there will be bikes (and docks) available at the stations I use?* This would help me evaluate the cost/benefit ratio of my City Bike subscription.

---

Fortunately, the good folks behind the City Bike system have an [open data policy](https://oslobysykkel.no/apne-data). They provide historical trip data and a real-time API for everyone to play with. Using this data, we can better understand the availability of bikes and docks.

[Flat-Data](https://githubnext.com/projects/flat-data/) is a toolchain that lets you work with data in Git and GitHub. With GitHub Actions, you can set up a job that regularly runs a task (for instance hitting up an api endpoint with a http request). You can then save the results to a file, versioning it through git, creating a historical overview from snapshot data like an api. I set up a job that fetches City Bike station data every 20 minutes, does some light [processing](https://github.com/Kalli/bysykkel-data/blob/main/postprocessing.js), and appends the results to a CSV file.

This CSV file is my data source for further wrangling. First, I dug into some system-wide stats using a [Python notebook](https://github.com/Kalli/bysykkel-data/blob/main/stations_notebook.ipynb). There are roughly 5,700 docks spread across 260 stations, and on average, around 2,150 bikes are available at any given time (with around 400 bikes out on the streets during peak hours).

{% include image.html url="https://github.com/Kalli/bysykkel-data/blob/main/charts/bysykkel-system-availability-changes-by-hour.png?raw=true)" description="When does the Oslo City Bike system get the most use?" %}

Next, I looked at when the system is busiest. There’s a sharp spike in activity between 7 and 9 in the morning, followed by a steady hum throughout the day, and another peak between 3 and 5 in the afternoon. My guess is that these peaks coincide with people commuting to and from work or school, with the rest of the rides happening at a slower pace during the day before quickly tapering off in the evening.

But what we *really* want to know is: How often will we come to an empty stand when we need a bike or a full one when we need to dock? By iterating over the data hour by hour, station by station, we can calculate how likely it is that a station will be empty or full when we need it. I built a heatmap for every station in the system, showing availability patterns over time. You can see an example below, or [browse all the stations here](https://htmlpreview.github.io/?https://github.com/Kalli/bysykkel-data/blob/main/charts/bysykkel-station-hour-by-hour-availability.html).

{% include image.html url="/img/thumbs/oslo-city-bike-heatmap.png" description="When are you most likely to find a bike?" %}

For the stations I use for my daily kindergarten commute, I found that there’s an 87% chance I’ll find a bike in the morning, but this drops to 72% in the afternoon. Docking is a breeze, with 100% availability in the morning and 99% in the afternoon. I’ll admit, if you’d asked me, I would’ve guessed the odds were worse—maybe my memory is biased, and those times I had to walk an extra few hundred meters loom larger in my mind than the times I grabbed a bike right where I needed it. Either way, if you’re in a similar situation, this might be helpful for you too.

The code I used to generate these stats and graphs is on my [GitHub](https://github.com/Kalli/bysykkel-data). Feedback, improvements, and discussions are welcome!

[^1]: I’ve also done some digging into kindergarten data around Oslo.[^2] There are 680 kindergartens in the capital, and 104 of them are closer to my house than the one we got a spot at. You can wishlist five kindergartens in case a spot opens up, but I’m not convinced that this system optimally solves what is essentially a version of the [stable marriage problem](https://en.wikipedia.org/wiki/Stable_marriage_problem). Unfortunately the bureaucrats at Oslo municipality did not seem interested in discussing alternative solutions with me over email.

[^2]: Maybe you can tell I’ve had some extra time to wrangle data and write blog posts since my daughter started kindergarten. Thanks, Norwegian welfare state! Also, if you need someone who’s good with open data and Python, I’m looking for work now that my “pappa perm” is wrapping up. Get in touch!

[^3]: I assume people prefer riding downhill—shocking insight, I know! I think the City Bike system could alleviate this issue at the margin by incentivising uphill rides. But for now, they use trucks to collect and redistribute bikes according to a schedule I’ve yet to fully grasp.