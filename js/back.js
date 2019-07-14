var back=(()=>{
  var books=[],sources={};
  const Sources="sources.json";
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
    if(sources=={}){webcrabber.getHTML(Sources,(html)=>{
      sources=JSON.parse(html);
      for(var i in sources)sources[i]["activate"]=true;
      console.log(sources);
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
