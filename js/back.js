var back=(()=>{
  var books=[],sources={};
  const Sources="https://raw.githubusercontent.com/OliverCWY/fiction/beta/sources.json";
  var getLocalBooks=()=>{
    books=backFund.getJSON("books");
  }
  var saveLocalBooks=()=>{
    backFund.setJSON("books",books);
  }
  var getLocalSources=()=>{
    sources=backFund.getJSON("sources");
  }
  var saveLocalSources=()=>{
    backFund.setJSON("sources",sources);
  }
  $(document).ready(()=>{
    getLocalSources();
    console.log(sources);
    if(sources==null){console.log(1);webcrabber.getHTML(Sources,(context)=>{
      sources=JSON.parse(context);
      console.log(sources);
      for(var i in sources)sources[i]["activate"]=true;
    });
    }
  });
  this.main_init=()=>{
    getLocalBooks();
    for(var i in books){
      var now=books[i];
      var source=now.source,name=now.name,author=now.author,lastRead=now.chapNum;
      var bookPage=$(webcrabber.getHTML(now.menuPage));
      //var list=bookPage.find(sources);
      //ui.addBook();
    }
  }
  return this;
})();
