var app = new Vue({
  el: '#app', //start vue here
  data: {
    query: {
      url: 'https://drhmonegyi.net/',
      perPage: 10,
      page: 1,
    },
    oldQuery: '',
    siteName: 'WP API Feed Reader',
    pageNumber: '',
    posts: '',
    activePost: '',
    queryError: '',
    hiContrast: {
      class: '',
      label: 'black'
    }
  },
  mounted: function() {
      this.wpQuery();
      this.getSiteName();
  },
  methods: {
    toggleHiContrast: function () {
      if(this.hiContrast.class) {
        this.hiContrast.class = '';
        this.hiContrast.label = 'black';
      } else {
        this.hiContrast.class = 'hi-contrast';
        this.hiContrast.label = 'white';
      }
    },
    readPost: function(post) {
      this.activePost = post;
      window.scrollTo(0, 0);
    },
    getSiteName: function(url  = this.query.url) {
      
      axios.get( this.query.url + '/wp-json/' )
      .then(response => {
        this.siteName = response.data.name
       })
    },
    wpQuery: function(page = this.query.page, perPage = this.query.perPage, url = this.query.url) {
      var route = url + '/wp-json/wp/v2/posts?per_page=' + perPage + '&page=' + page;
      //GET posts from WordPress REST API
      axios.get( route, { timeout: 2500, maxRedirects: 3 } )
      .then(response => {
          this.posts = response.data,
          this.pageNumber = response.headers['x-wp-totalpages'],
          this.activePost = (this.posts[0]),
          this.oldQuery = url;
      })
      .catch(error => {
        if(!error.status) {
          this.queryError = 'No REST API Founded';
        }
      });
      window.scrollTo(0, 0);
    },
    searchFeed: function() {
      var regEx = /^(http:\/\/|https:\/\/)+?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
      var url = this.query.url;
      
      if(url.match(regEx)){
        this.wpQuery(1, this.query.perPage, url);
        this.getSiteName(url);
      } else { this.queryError = 'Requires a valid URL with protocol (e.g. https://wptavern.com)'; }
    },
    clearFeed: function() {
      this.posts = '';
      this.activePost = '';
      this.query.url = '';
      this.siteName = 'WP API Feed Reader';
    },
    closeModal: function() {
      this.query.url = this.oldQuery;
      this.wpQuery();
    }
  },
  watch: {
    "query.perPage": function(pp) {
      if(pp < 10 && pp > 0){
        this.wpQuery(1, pp);
        this.query.page = 1;
      }
    }
  }
});
