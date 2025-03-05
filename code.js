// console.log("Hello")

let lyrics;

const searchButton = document.getElementById('button')
const searchBar = document.getElementById('searchBar')
const result = document.getElementById('output')


searchButton.addEventListener('click', function(){
  const searchedSong = document.getElementById('searchBar').value
  console.log(searchedSong)

  const [artist, songName] = searchedSong.split('-')

  fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(songName)}`)
  .then(response => response.json())
  .then(data => {
    lyrics = data.lyrics
    console.log(lyrics)
    result.innerHTML = `<pre>${lyrics}</pre>`

  })
  .catch(error => {
    result.innerHTML = `<pre>${error} has occured</pre>`
  })


})


