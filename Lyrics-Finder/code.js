// console.log("Hello")

let lyrics;

const searchButton = document.getElementById('button')
const searchBar = document.getElementById('searchBar')
const result = document.getElementById('output')
const input = document.getElementById('input')


searchButton.addEventListener('click', function(){
  const searchedSong = document.getElementById('searchBar').value
  console.log(searchedSong)

  if(searchedSong.includes('-')){

    const [artist, songName] = searchedSong.split('-')

  fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(songName)}`)
  .then(response => response.json())
  .then(data => {
    lyrics = data.lyrics
    console.log(lyrics)

    if(lyrics){
      input.style.marginTop = '35px'
      result.innerHTML = `<pre>${lyrics}</pre>`
    }
    else{
      result.innerHTML = "<p>Lyrics not found</p>"
      setInterval(() => {
        searchBar.value=''
        result.innerHTML = "<p>Try another song</p>"
      }, 4000);
    }
    
  })
  .catch(error => {
    result.innerHTML = `<pre>${error} has occured</pre>`
    searchBar.value=''
  })
  } else{
    result.innerHTML = `<p>Enter the artist and song name in the format mentioned above</p>`
    searchBar.value=''

  }

  


})


