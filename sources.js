sources={
  "www.xbiquge6.com":{
    name:"笔趣阁",
    url:"www.xbiquge6.com",
    search:{
      url:"https://www.xbiquge6.com/search.php?keyword=%s",
      selector:".result-item.result-game-item",
      cover:".result-game-item-pic-link-img",
      name:".result-game-item-title-link span",
      author:".result-game-item-info-tag:first-child span:last-child",
      link:".result-game-item-title-link",
      latest:"a.result-game-item-info-tag-item[cpos='newchapter']",
      lastUpdateDate:".result-game-item-info-tag:nth-child(3) span:last-child"
    },
    book:{
      list:"#list dd a",
      linkprefix:"https://www.xbiquge6.com",
      chapterName:".bookname h1",
      bookName:"#info h1",
      text:"#content"
    }
  },
  "www.bxwx666.org":{
    name:"笔下文学",
    url:"www.bxwx666.org",
    search:{
      url:"http://www.bxwx666.org/search.aspx?bookname=%s",
      selector:".l li",
      cover:"",
      name:".s2 a",
      author:".s4",
      link:".s2 a",
      latest:".s3 a",
      lastUpdateDate:"",
      encode:"gb"
    },
    book:{
      list:"#list dd a",
      linkprefix:"",
      chapterName:".bookname h1",
      bookName:"#info h1",
      text:"#zjneirong",
      cover:"#fmimg img",
      ad:"#xuanchuan"
    }
  },
  /*
  "www.biqux.com":{
    name:"笔趣轩",
    url:"www.biqux.com",
    search:{
      url:"http://www.biqux.com/plus/search.php?kwtype=0&searchtype=&q=%s",
      selector:".ul_b_list li",
      cover:".pic img",
      name:"h2 a",
      author:".state a:first-child",
      link:".result-game-item-title-link",
      linkprefix:"http://www.biqux.com/",
      imgprefix:"http://www.biqux.com/",
      latest:"h2 a",
      lastUpdateDate:""
    },
    book:{
      list:".list_box li a",
      linkprefix:"https://www.xbiquge6.com",
      chapterName:".bookname h1",
      bookName:"#info h1",
      text:"#content"
    }
  },*/
}
back.setSources(sources);
