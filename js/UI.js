var ui=(()=>{
  this.addBook=(book)=>{
    var container=$("<div class='bookContainer'></div>");
    var box=$("<a class='bookBox' href='"+book.readURL+"'></a>");
    var cover=$("<img src='"+book.coverURL+"' class='bookCover'>");
    var info=$("<div class='bookInfo'><h4 class='bookName'>"+book.name+"</h4>作者："+book.author+"<br>上次阅读："+book.lastRead+"<br>最新章节："+book.newest+"</div>");
    var del=$("<a href='#' class='bookDelete'><i class='material-icons'>delete</i></a>");
    del.click(book.functions.delete);
    $("#main").append(container.append(box.append(cover,info,del)));
  }
  return this;
})();
