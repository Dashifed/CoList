<template>
  <div>
    <div id="nav" v-if="$auth.isAuthenticated">
      <span class="material-icons md-24">menu</span>
    </div>
    <div id="sidebar">
      <div class="sidebar-content">
        <div class="sidebar-tile">
          <div class="sidebar-title"><router-link class="sidebar-name" to="/profile"><div class="sidebar-name">All</div></router-link></div>
        </div>
        <div class="sidebar-tile">
          <div class="sidebar-title"><router-link class="sidebar-name" to="/profile/today"><div class="sidebar-name">Today</div></router-link></div>
        </div>
        <div class="sidebar-tile">
          <div class="sidebar-title"><router-link class="sidebar-name" to="/profile/tomorrow"><div class="sidebar-name">Tomorrow</div></router-link></div>
        </div>
      </div>
    </div>
    <div><router-view></router-view></div>
  </div>
</template>
<style>
.material-icons{ 
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
}
.material-icons.md-18 { font-size: 18px; }
.material-icons.md-24 { font-size: 24px; }
.material-icons.md-36 { font-size: 36px; }
.material-icons.md-48 { font-size: 48px; }
#nav {
  display: flex;
  height: 40px;
  align-items: space-between;
  line-height: 40px;
  background-color: #506578;
  padding-left: 35px;
  padding-right: 35px;
  align-items: center;
}

#nav a {
  font-weight: bold;
  color: #42b983;
  text-decoration: none;
}
#sidebar {
  background: #fafafa;
  transition: box-shadow 300ms ease-in 0s;
  width: 305px;
  height: calc(100vh - 40px);
  margin: 0;
  box-sizing: border-box;
  position: absolute;
}
.sidebar-content {
  display: block;
  text-align: left;
  box-sizing: border-box;
  padding-left: 20px;
  padding-top: 20px;
}
.sidebar-tile {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
  box-sizing: border-box;
  line-height: 1.5;
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
}
.sidebar-tile:hover {
  background: #ececec;
}
.sidebar-title {
  padding-left: 10px;
}
.sidebar-name {
  outline: none;
  text-decoration: none;
  color: #2c3e50;
}
</style>