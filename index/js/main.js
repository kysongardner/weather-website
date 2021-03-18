function changeMenu() {
    document.getElementsByClassName("menu")[0].classList.toggle("menuEdit")
}

const url = 'https://byui-cit230.github.io/weather/data/towndata.json'
fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        const towns = jsonObject['towns'];
        for (let i = 0; i < towns.length; i++) {
            let townGroup = document.createElement('section')
            let name = document.createElement('h1')
            let motto = document.createElement('h5')
            let yearFounded = document.createElement('p')
            let population = document.createElement('p')
            let annualRainFall = document.createElement('p')
            let photo = document.createElement('img')

            name.textContent = towns[i].name
            motto.textContent = towns[i].motto
            yearFounded.textContent = 'Year Founded:' + ' ' + towns[i].yearFounded
            population.textContent = 'Population:' + ' ' + towns[i].currentPopulation
            annualRainFall.textContent = 'Annual Rain Fall:' + ' ' + towns[i].averageRainfall
            photo.setAttribute('src', 'images/city.jpg')

            townGroup.appendChild(name)
            townGroup.appendChild(motto)
            townGroup.appendChild(yearFounded)
            townGroup.appendChild(population)
            townGroup.appendChild(annualRainFall)
            townGroup.appendChild(photo)
            document.querySelector('div.town-group').appendChild(townGroup);
        }
    })