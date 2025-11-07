# Comedy Compost Random Manga Generator
![Comedy Compost Youtube Banner](./comedy-compost-random-manga/images/image.png)
Website made by Nolan Nishikawa, primarily for use in a YouTube video

*NOTE: include link to website here if ever deployed*

## Table of Contents
1. [General Information](#general-information)
2. [How it Works](#how-it-works)
3. [References and Acknowledgements](#references-and-acknowledgements)
4. [How to Run Website Locally](#how-to-run-website-locally)
5. [Contact Me](#contact-me)
6. [License](#license)


## General Information
This web app makes use of the information provided by MyAnimeList in order to provide random manga recommedation to the user, written in TypeScript using the React framework.

If you want to see more from Comedy Compost, you check out the main YouTube page here: [Comedy Compost Youtube Page](https://www.youtube.com/@ComedyCompost)

*Note: will include youtube video here once video is finished*

## How it works
There are 2 different ways you can get random manga recommedations.

1. The first way is getting manga recommendations at complete random. This is done through a process that includes first picking a random page of results from the hundreds of pages that can be found on MyAnimeList. Once this random page is selected, a random manga from the selected page is chosen and the information about the result is displayed to the viewer.

2. The second way involves some more user input, in which you are able to speciy which genres you want to include and exclude from the search. After factoring the genres that are included/excluded, the same process as the process above occurs with the filtered information. 

### <span style="color: red" markdown="1">NOTE: MyAnimeList hosts numerous manga that contain subject matter and themes that are NOT suitable for all audiences, such as extreme violence, gore, and pornographic content. User Discretion is strongly advised while using this website</span>

## References and Acknowledgements
This website makes use of different API's provided by different groups/organizations, and I want to acknowledge where the information that I am providing here comes from, and what services provided by others I am making use of

* Jikan API V4 for getting MyAnimeList manga information: [Jikan API](https://jikan.moe/)
* Jikan API Documentation V4: [Jikan Documentation](https://docs.api.jikan.moe/)
* MangaDex - The Home of Comics and Manga: [Mangadex Website](https://mangadex.org/)
* MangaDex API Documentation: [MangaDex Documentation](https://api.mangadex.org/docs/)
* MyAnimeList manga list: [MAL Manga List](https://myanimelist.net/topmanga.php)

## How to Run Website Locally

If you would prefer to run the website locally, instead of relying on a deployed website (this is technically the only way right now, haven't gotten around to deploying yet), you can follow these instructions here.

1. Using Git, clone the repo to your machine using the command 
```
git clone https://github.com/nolannish/comedy-compost-random-manga.git
```
2.  cd into the newly cloned repo and the actual code with 
```
cd comedy-compost-random-manga/comedy-compost-random-manga
```
3. Next, you need to install different dependencies, and to do so run
```
npm install
```

4. Finally, start up the web server using the command:
```
npm run dev
```

5. Then in your browser, go to localhost:3000 and then you should be able to access the website.

## Contact Me

If you have any sort of idea that you think would improve this website, or if you find any bug/issue in use, feel free to create an issue in the GitHub Repo, and I will try to address and incorporate it in the future when I get the chance. 

## License

This website is under the MIT License, and free to use by anyone. For more information on the license for this website, [check here](https://github.com/nolannish/comedy-compost-random-manga/blob/main/LICENSE). 

For more information about the MIT License in general, [check here](https://tlo.mit.edu/understand-ip/exploring-mit-open-source-license-comprehensive-guide)
