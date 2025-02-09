

let logo = document.querySelector('#logo');
const text = logo.innerText;
let clutter = '';
for (let i = 0; i < text.length; i++) {
  clutter += `<span class="inline-block">${text[i]}</span>`;
}
logo.innerHTML = clutter;


gsap.from('#logo span', {
    y: 20,
    opacity: 0,
    stagger: 0.1,
})
gsap.from("#confessionBox",{
    opacity: 0,
    delay: 1,
    scale:0.7,
    duration:2,
})

//CONFESSIONS
const confessionList = document.querySelector('.confession');
const callApi = async () =>{
  const result = await fetch('/confession');
  const data = await result.json();
  console.log(data);
  
  if(data.length != 0){function createNewList(){
    data.forEach(confession => {
      const newConfession = document.createElement('h1');
      const confessiontxt = document.createElement('h2');
      const newDiv = document.createElement('div');
      newDiv.setAttribute('class', 'confession');
      confessiontxt.innerText = 'Confession:';
      newDiv.appendChild(confessiontxt);
      newDiv.classList.add('confession-item');
      newConfession.innerText = confession.confession;
      newDiv.appendChild(newConfession);
      confessionList.appendChild(newDiv);
    });
  }
  createNewList();}
  else{
    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'confession');
    newDiv.innerText = 'No confessions yet 😅';
    confessionList.appendChild(newDiv);
  }
}
callApi();