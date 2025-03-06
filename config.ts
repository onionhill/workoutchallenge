const CONFIG = {
    PORT: 3001,
    HOST: "http://localhost",
    get API_URL() {
      return `${this.HOST}:${this.PORT}/api`;
    },
  };
  
  export default CONFIG;