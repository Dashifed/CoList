<template>
  <div>
    <div id="nav" v-if="$auth.isAuthenticated">
      <span class="material-icons md-24" id="sidebar-toggle" v-on:click="toggle = !toggle">menu</span>
    </div>
    <div id="sidebar" v-show="toggle">
      <div class="sidebar-content">
        <div class="sidebar-tile">
          <router-link class="sidebar-name" to="/profile">All</router-link>
        </div>
        <div class="sidebar-tile">
          <router-link class="sidebar-name" to="/profile/today">Today</router-link>
        </div>
        <div class="sidebar-tile">
          <router-link class="sidebar-name" to="/profile/tomorrow">Tomorrow</router-link>
        </div>
      </div>
    </div>
    <div id="main-area">
      <button id="new-todo" class="todo-button" v-on:click="isHidden = true" v-if="!isHidden">Add task</button>
      <input id="input-newtodo" @keyup.esc="isHidden = false" v-if="isHidden"/>
      <button id="cancel-todo" class="todo-button" v-on:click="isHidden = false" v-if="isHidden">Cancel</button>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    isHidden: false,
    toggle: true
    }
  },
}

</script>
<style>
.material-icons{ 
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
}
.material-icons.md-18 { font-size: 18px; }
.material-icons.md-24 { font-size: 24px; }
.material-icons.md-36 { font-size: 36px; }
.material-icons.md-48 { font-size: 48px; }
#main-area {
  padding-top: 36px;
}
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
  width: 305px;
  height: calc(100vh - 40px);
  margin: 0;
  box-sizing: border-box;
  position: absolute;
}
a.router-link-exact-active {
  background: #ececec;
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
  border-radius: 5px;
}
.sidebar-tile:hover {
  background: #ececec;
}
.sidebar-name {
  display: block;
  outline: none;
  text-decoration: none;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  padding: 5px;
  padding-left: 10px;
  box-sizing: border-box;
  line-height: 1.5;
  cursor: pointer;
  border-radius: 5px;
}
#new-todo {
  display: inline-block;
  cursor: pointer;
  border: none;
  background: #ececec;
  color: #c4c4c4;
  border-radius: 10px;
  width: 50vw;
  height: 5vh;
  padding: 10px;
  text-align: left;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
}
#cancel-todo {
  cursor: pointer;
}
</style>