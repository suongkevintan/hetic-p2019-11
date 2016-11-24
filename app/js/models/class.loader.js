export class appLoader {
    constructor() {
        window.loadState = "initJs";
        this.loadState = window.loadState;
        this.container = document.querySelector('.loader');
        this.display = document.querySelector('.loader--state');
        return this;
    }



    changeState(state) {
        window.loadState = state;
        if (state === "end") {
             setTimeout(() => {document.querySelector('.loader').className = "loader hide"}, 250)
             state = "Almost there";
        }

        if (this.display)
            this.display.innerHTML = state + "...";
        else
            document.querySelector('.loader--state').innerHTML = state + "..."
    }
}
