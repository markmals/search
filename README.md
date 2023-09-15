# Search

A bespoke search client built with [SerpApi](https://serpapi.com/) and [Remix](https://remix.run)

## Features

- [x] Clean search results page that only displays organic results
- [ ] Try to fetch missing favicons from the sites' `<head>` using the `facebookexternalhit/1.1` user agent
- [ ] "Did you mean…?" support
- [ ] Add image thumbnails to search results, if they exist
- Narrow search scope down by site with a GUI (e.g. "only search Wikipedia")
    - [ ] Google Image search (inspiration: [1](https://dribbble.com/shots/828786-Google), [2](https://cdn.dribbble.com/users/47552/screenshots/17615415/media/3a38bc7ccc47c5bacf66647ac65d35bd.png))
    - [ ] YouTube search
    - Sherlock's search categories
        - [ ] Online shopping (e.g. eBay, Amazon)
        - [ ] Currency exchange
        - [ ] Flights
        - [ ] [Movie showtimes](https://cdn.arstechnica.net/wp-content/uploads/archive/reviews/02q3/macosx-10.2/images/sherlock.jpg)
        - [ ] Recipes
        - [ ] Phone numbers (e.g. Yellow Pages); maybe this could be like a map/business search? Integration with Apple Maps?
        - [ ] Reference (e.g. Wikipedia, dictionary, thesaurus)
        - [ ] Stock market
        - [ ] Language translation
- User settings
    - [ ] Number of description lines
    - [ ] Open links in new tab or same tab
    - [ ] Control font size
- [ ] Mute/filter/block certain sites/URLs from results
- [ ] Custom color themes for certain keywords (e.g. `Barbie` pink)