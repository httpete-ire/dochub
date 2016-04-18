# [Dochub](https://dochub.co/)

![Dochub editor](https://httpete.com/images/dochub/editor-page.jpg)

Dochub is an online documentation platform for creating, managing and sharing docs. Formatted documentation is easily written using an online text editor and the Markdown markup language. Readers can suggest changes by making pull requests which the author can merge.

The main objective of the project was to research compiler design principles and develop a Markdown to HTML compiler with an associated web application. Full research was carried out to identify the key phases needed for a parsing Markdown, Lexical analyser, Syntax analyser and Code generation. The Markdown parser can be found [here](https://github.com/httpete-ire/docd-parser).

![System model](http://i.imgur.com/fZbAKMVr.png)

The web application was split into two independent components, a REST API and a singe page application. The REST API is responsible for providing access to the data through a set of URLs, the API was developed using Node.js and MongoDB. The single page application which was built using Angular,it is responsible for displaying data in the user interface and handling user interactions.


### [View application](https://dochub.co/)
