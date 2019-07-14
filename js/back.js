var back=(()=>{
  var books={},sources={};
  const Sources="https://raw.githubusercontent.com/OliverCWY/fiction/beta/sources.json";
  this.setSources=(s)=>{sources=s;}
  var getLocalBooks=()=>{
    books=backFund.getJSON("books")||{};
  }
  var saveLocalBooks=()=>{
    backFund.setJSON("books",books);
    console.log(books);
  }
  var getLocalSources=()=>{
    sources=backFund.getJSON("sources");
  }
  var saveLocalSources=()=>{
    backFund.setJSON("sources",sources);
  }
  var saveTempBook=(temp)=>{
    backFund.setJSON("temp",temp);
  }
  var loadTempBook=()=>{
    return backFund.getJSON("temp");
  }
  var main_init=()=>{
    for(var i in books){
      var now=books[i];
      var send={
        readURL:"index.html?url="+now.url+"&chap="+now.chap,
        coverURL:now.coverURL,
        name:now.name,
        author:now.author,
        functions:{
          delete:()=>{
            delete books[i];
            saveLocalBooks();
          }
        }
      }
      if(now.lastRead)send["lastRead"]=now.lastRead;else send["lastRead"]="";
      if(now.list)send["latest"]=now.list[now.list.length-1].title;else send["latest"]="";
      var book=getSource(now.url).book;
      ui.addBook(send);
      webcrabber.getHTML(now.url,(html,now)=>{
        var page=$(html);
        var links=page.find(book.list),name=page.find(book.bookName).text();
        var list=[];
        links.each((idex,ele)=>{list.push({link:book.linkprefix+$(ele).attr("href"),title:ele.innerHTML});});
        books[now.url].list=list;
        var send={latest:list[list.length-1].title}
        if(book.cover)console.log(books[now.url].coverURL=send["coverURL"]=page.find(book.cover).attr("src"));
        console.log(send);
        saveLocalBooks();
        ui.update(send,"index.html?url="+now.url+"&chap="+now.chap);
      },now);
    }
  }
  var getSource=(u)=>{
    var url=u.substr(u.indexOf("//")+2,u.length);
    url=url.substr(0,url.indexOf("/"));/*
    for(var i in sources){
      if(sources[i].url=url)return sources[i];
    }*/
    return sources[url];
  }
  var parsePage=(url,id)=>{
    var now,temp;
    if(books[url]){
      now=books[url];
      books[url]["chap"]=id;
      var book=getSource(url).book;
      if(now.list){
        if(id>=0&&id<now.list.length){
          var u=now.list[id].link;
          console.log(u);
          webcrabber.getHTML(u,(html)=>{
            var page=$(html);
            if(book.ad)page.find(book.ad).remove();
            var name=page.find(book.chapterName).text()
            var text=page.find(book.text).html();
            ui.displayPage(name,text,"index.html?url="+url+"&chap="+(id-1),"index.html?menu="+url,"index.html?url="+url+"&chap="+(id+1));
            ui.setTitle(now.name);
            books[url]["lastRead"]=name;
            saveLocalBooks();
          });
        }else{
          ui.displayPage("","","index.html?url="+url+"&chap=-1","index.html?menu="+url,"index.html?url="+url+"&chap="+(id+1));
          ui.message("无此页面");
        }
      }else{
        var book=getSource(url).book;
        webcrabber.getHTML(url,(html)=>{
          var page=$(html);
          var links=page.find(book.list),bookName=page.find(book.bookName).text();
          var u=[];
          links.each((idex,ele)=>{u.push({link:book.linkprefix+$(ele).attr("href"),title:ele.innerHTML});});
          books[url]["list"]=u;
          if(id>=0&&id<u.length){
            webcrabber.getHTML(u[id].link,(html)=>{
              var page=$(html);
              if(book.ad)page.find(book.ad).remove();
              var name=page.find(book.chapterName).text()
              var text=page.find(book.text).html();
              books[url]["lastRead"]=name;
              if(book.cover)books[url].coverURL=page.find(book.cover).attr("src");
              ui.displayPage(name,text,"index.html?url="+url+"&chap="+(id-1),"index.html?menu="+url,"index.html?url="+url+"&chap="+(id+1));
              ui.setTitle(bookName);
              saveLocalBooks();
            });
          }else{
            ui.displayPage("","","index.html?url="+url+"&chap=-1","index.html?menu="+url,"index.html?url="+url+"&chap="+(id+1));
            ui.message("无此页面");
          }
        });
      }
    }else if((temp=loadTempBook())!=null&&temp[url]==url){
        now=temp;
        var book=getSource(url).book;
        if(id>=0&&id<now.list.length){
          var u=now.list[id];
          webcrabber.getHTML(u,(html)=>{
            var page=$(html);
            if(book.ad)page.find(book.ad).remove();
            var name=page.find(book.chapterName).text()
            var text=page.find(book.text).html();
            ui.displayPage(name,text,"index.html?url="+url+"&chap="+(id-1),"index.html?menu="+url,"index.html?url="+url+"&chap="+(id+1));
            ui.setTitle(now.name);});
        }else{
          ui.displayPage("","","index.html?url="+url+"&chap=-1","index.html?menu="+url,"index.html?url="+url+"&chap="+(id+1));
          ui.message("无此页面");
        }
    }else{
      var book=getSource(url).book;
      webcrabber.getHTML(url,(html)=>{
        var page=$(html);
        var links=page.find(book.list),bookName=page.find(book.bookName).text();
        var u=[];
        links.each((idex,ele)=>{u.push({link:book.linkprefix+$(ele).attr("href"),title:ele.innerHTML});});
        saveTempBook({name:bookName,list:u});
        if(id>=0&&id<u.length){
          webcrabber.getHTML(u[id].link,(html)=>{
            var page=$(html);
            if(book.ad)page.find(book.ad).remove();
            var name=page.find(book.chapterName).text()
            var text=page.find(book.text).html();
            ui.displayPage(name,text,"index.html?url="+url+"&chap="+(id-1),"index.html?menu="+url,"index.html?url="+url+"&chap="+(id+1));
            ui.setTitle(bookName);
          });
        }else{
          ui.displayPage("","","index.html?url="+url+"&chap=-1","index.html?menu="+url,"index.html?url="+url+"&chap="+(id+1));
          ui.message("无此页面");
        }
      });
    }
  }
  var parseList=(url)=>{
    var book=getSource(url).book;
    webcrabber.getHTML(url,(html)=>{
      var page=$(html);
      var links=page.find(book.list),name=page.find(book.bookName).text();
      var list=[];
      links.each((idex,ele)=>{list.push({link:"index.html?url="+url+"&chap="+idex,title:ele.innerHTML});});
      ui.displayList(name,list);
      var list=[];
      links.each((idex,ele)=>{list.push({link:book.linkprefix+$(ele).attr("href"),title:ele.innerHTML});});
      if(books[url])books[url]["list"]=list;
    });
  }
  var sourcesArray=[];
  var searchSource=(i,nam)=>{
    if(i<sourcesArray.length)
    {
      var name;
      var source=sources[sourcesArray[i]];
      if(source.search.encode){
        if(source.search.encode=="gb")name=$URL.encode(nam);
        else if(source.search.encode="utf")name=encode(nam);}
      else name=nam;
      webcrabber.getHTML(source.search.url.replace("%s",name),(html)=>{
        searchSource(i+1,nam);
        console.log(source.search.url);
        var page=$(html),search=source.search;
        var results=page.find(search.selector);
        results.each((index,ele)=>{
          console.log($(ele).find(search.name).html());
          var name=$(ele).find(search.name).html(),
            coverURL=search.imgprefix||""+$(ele).find(search.cover).attr("src"),
            author=$(ele).find(search.author).text().replace(" ",""),
            link=search.linkprefix||""+$(ele).find(search.link).attr("href"),
            latest=$(ele).find(search.latest).text(),
            lastUpdateDate=$(ele).find(search.lastUpdateDate).text();
          var x={
            author:author,
            name:name,
            readURL:"index.html?url="+link+"&chap=0",
            coverURL:coverURL||"",
            latest:latest,
            lastUpdateDate:lastUpdateDate,
            functions:{add:()=>{
              books[link]={
                name:name,
                chap:0,
                coverURL:coverURL,
                latest:latest,
                author:author,
                url:link
              };
              var book=getSource(link).book;
              saveLocalBooks();
              console.log(backFund.getJSON("books"));/*
              webcrabber.getHTML(link,(html)=>{
                var page=$(html);
                var links=page.find(book.list),name=page.find(book.bookName).text();
                var list=[];
                links.each((idex,ele)=>{list.push({link:book.linkprefix+$(ele).attr("href"),title:ele.innerHTML});});
                books[link].list=list;
                if(book.coverURL)books[link]["coverURL"]=page.find(book.cover).attr("src");
                //saveLocalBooks();
              });*/
            }}
          }
          ui.addResult(x);
        });
      });
    }
  }
  var search=(nam)=>{
    console.log("sources:",sources);
    sourcesArray=[];
    for(var i in sources)sourcesArray.push(sources[i].url);
    console.log(sourcesArray);
    searchSource(0,nam);
  }
  $(document).ready(()=>{
    getLocalBooks();
    console.log(books);
    if(backFund.url.hasParam("search")){
      search(backFund.url.param("search"));
    }else if(backFund.url.hasParam("menu")){
      parseList(backFund.url.param("menu"));
    }else if(backFund.url.hasParam("chap")){
      parsePage(backFund.url.param("url"),parseInt(backFund.url.param("chap")));
    }else main_init();
  });
  return this;
})();
