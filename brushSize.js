
class Size{
  constructor(){
    this.minSize = 0.5;
    this.maxSize = 20;
    this.defaultSize = 4;
    this.$radValue = document.getElementById('size-value');
    this.$decSize = document.getElementById('decreaseSize');
    this.$incSize = document.getElementById('increaseSize');
    this.interval = 2;
    this.init();
    this.decreaseSize();
    this.increaseSize();
  }

  init(){
    this.setSize(this.defaultSize);
  };

  decreaseSize(){
      this.$decSize.onclick = ()=>{

          this.setSize(this.size - this.interval);
        }
  };

  increaseSize(){
      this.$incSize.onclick = ()=>{
          this.setSize(this.size + this.interval);
        }
  };


  setSize(newSize){

      if(newSize < this.minSize){
        newSize = this.minSize;

      }
      else if (newSize > this.maxSize){
        newSize = this.maxSize
      }
      this.size = newSize;
      this.$radValue.innerHTML = this.size;
  };

};
