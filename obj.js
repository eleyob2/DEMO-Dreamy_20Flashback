const image = document.getElementById("image");
const text1 = document.getElementById("text1");
const text2 = document.getElementById("text2");
const buttonDiv = document.getElementById("buttons");
let audio = new Audio(); //Vanilla JS audio element, can be used to play music in the background of the scenes.
// add in Audio functionality

class Scene {
    constructor(imagePath, text1, text2){
        this.imagePath = imagePath;
        this.text1 = text1;
        this.text2 = text2;
        this.children = [];
    }

    // add child nodes to the scene
    setChildren(children){
        this.children = children;
    }

    // clear all buttons on the scene, and adds one button for each child node
    loadChildrenButtons(){
        buttonDiv.innerHTML = "";
        for(let i = 0; i < this.children.length; i++){
            let newButton = document.createElement("button");
            newButton.innerText = "Option " + (i + 1);

            // call exit scene First
            newButton.addEventListener("click", () => this.exitScene());

            //becasuse of annoying JS weirdness, you can't simply call this.children[i].renderScene() in the event listener, you have to wrap it in an anonymous function like this.
            newButton.addEventListener("click", () => this.children[i].renderScene()); 
            buttonDiv.appendChild(newButton);
        }
    }

    // render this scene on the screen
    renderScene(){
        image.src = this.imagePath;
        text1.innerText = this.text1;
        text2.innerText = this.text2;
        this.loadChildrenButtons();
    }
    //called once when a new button is clicked
    exitScene(){
    }
}

class MusicScene extends Scene {
    constructor(imagePath, text1, text2, audioPath){
        super(imagePath, text1, text2);
        this.audioPath = audioPath;
    }
    renderScene(){
        super.renderScene();
        audio.src = this.audioPath;
        audio.play();
    }
    exitScene(){
        audio.pause();    
    }
}


let rootScene = new Scene("./image1.webp", "test test test", "hello world");
let choiceA = new MusicScene("./image2.jpg", "testA", "testA again", "./Dreamy_20Flashback.mp3");
let choiceB = new MusicScene("./image3.jpg", "testB", "testB again", "./Investigations.mp3");

// add child nodes
rootScene.setChildren([choiceA, choiceB]);
choiceA.setChildren([rootScene, choiceB]);
choiceB.setChildren([choiceA, choiceB]);

rootScene.renderScene();
