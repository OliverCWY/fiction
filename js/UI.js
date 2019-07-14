var ui=(()=>{
  this.message=(m)=>{
    $("#main").html("");
    $("#main").append($("<h3 style='text-align:center'>"+m+"</h3>"));
  }
  var create=(ele)=>{
    return document.createElement(ele);
  }
  this.update=(update,readURL)=>{
    var cons=document.getElementsByClassName("bookContainer"),container;
    for(var i in cons)
      if($(cons[i]).find(".bookBox").attr("href")==readURL){container=cons[i];break;}
    if(update.latest)$(container).find(".latest").html(update.latest);
    if(update.coverURL)$(container).find("img").attr("src",update.coverURL);
    console.log(readURL);
    console.log(container);
  }
  this.addBook=(book)=>{
    var container=create("div");
    $(container).addClass("bookContainer");
    var box=create("a");
    $(box).addClass("bookBox")
    box.href=book.readURL;
    var cover=create("img");
    $(cover).addClass("bookCover");
    cover.src=book.coverURL;
    var info=create("div");
    $(info).addClass("bookInfo");
    info.innerHTML="<h4 class='bookName'>"+book.name+"</h4>作者："+book.author+"<br>上次阅读："+book.lastRead+"</span><br>最新章节：<span class='latest'>"+book.latest+"</span></div>";
    var del=$("<a href='#' class='bookDelete'><i class='material-icons'>delete</i></a>");
    box.appendChild(cover);
    box.appendChild(info);
    $(box).append(del);
    container.appendChild(box);
    console.log(container);
    $("#main").append($(container));
    del.click(()=>{book.functions.delete();container.remove()});
  }
  this.addResult=(book)=>{
    var container=$("<div class='bookContainer'></div>");
    var box=$("<a class='bookBox' href='"+book.readURL+"'></a>");
    var cover=$("<img src='"+book.coverURL+"' class='bookCover'>");
    var info=$("<div class='bookInfo'><h4 class='bookName'>"+book.name+"</h4>作者："+book.author+"<br>更新时间："+book.lastUpdateDate+"<br>最新章节："+book.latest+"</div>");
    var del=$("<a href='#' class='bookAdd'><i class='material-icons'>add</i></a>");
    del.click(book.functions.add);
    $("#main").append(container.append(box.append(cover,info,del)));
  }
  this.displayList=(name,list)=>{
    var title=$("<h3 style='text-align:center'>"+name+"</h3>");
    var lst=$("<div class='bookList'></div>");
    for(var i in list){
      var a=$("<div></div>").append($("<a href='"+list[i].link+"'>"+list[i].title+"</a>"));
      lst.append(a);
    }
    $("#main").append(title).append(lst);
  }
  this.setTitle=(title)=>{
    $(".mdl-layout__header-row .mdl-layout-title").html(title);
  }
  this.displayPage=(name,text,prev,menu,next)=>{
    $("#prev").attr("href",prev);
    $("#menu").attr("href",menu);
    $("#next").attr("href",next);
    var title=$("<h3 style='text-align:center'>"+name+"</h3>");
    var txt=$("<div id='text'></div>").html(text);
    var nav=$("<div class='nav'></div>");
    nav.append($("<div></div>").append("<a href='"+prev+"'>上一页</a>")).append($("<div></div>").append("<a href='"+menu+"'>目录</a>")).append($("<div></div>").append("<a href='"+next+"'>下一页</a>"));
    $("#main").append(title).append(txt).append(nav);
  }
  return this;
})();
