var backFund=(()=>{
  this.getJSON=(name)=>{
    value=localStorage.getItem(name)
    if(value!=null)
      return JSON.parse(value);
    else
      return {};
  }
  this.setJSON=(name,value)=>{
    localStorage.setItem(name,JSON.stringify(value));
  }
  return this;
})();
