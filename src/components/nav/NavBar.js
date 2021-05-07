import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import $ from 'jquery'

export const NavBar = (props) => {
    var util = {
        mobileMenu() {
          $("#nav").toggleClass("nav-visible");
        },
        windowResize() {
          if ($(window).width() > 800) {
            $("#nav").removeClass("nav-visible");
          }
        },
        scrollEvent() {
          var scrollPosition = $(document).scrollTop();
          
          $.each(util.scrollMenuIds, function(i) {
            var link = util.scrollMenuIds[i],
                container = $(link).attr("href"),
                containerOffset = $(container).offset().top,
                containerHeight = $(container).outerHeight(),
                containerBottom = containerOffset + containerHeight;
      
            if (scrollPosition < containerBottom - 20 && scrollPosition >= containerOffset - 20) {
              $(link).addClass("active");
            } else {
              $(link).removeClass("active");
            }
          });
        }
      };
      
      $(document).ready(function() {
        
        util.scrollMenuIds = $("a.nav-link[href]");
        $("#menu").click(util.mobileMenu);
        $(window).resize(util.windowResize);
        $(document).scroll(util.scrollEvent);
        
      });
      
                    
      
    
    
    return (
        
        <nav class="navbar">
  <div id="trapezoid">
      <li>
 <Link className="expandHome ref"  to="/">Games</Link></li>
  <li><Link className="expandHome ref"  to="/events">Events</Link></li>
  <Link className="expandHome ref"  to="/profile">My Profile</Link>
    <a href="https://www.linkedin.com/in/ericathompsonsmiles/" class="expandHome ref">Contact Us</a>
     <div class="subnav">
     <button class="subnavbtn">Major Gaming Locations<i class="fa fa-caret-down"></i></button>
       <div class="subnav-content">
        <div id="subnav-trapezoid">
          <a className="refSub subText" href="http://www.thegamecave.net/">FizzBall Gamers</a>
          <a className="refSub subText" href="http://gamegalaxyarcade.com/">LeetCode Let Me Out</a>
          <a className="refSub subText" href="NAGACentral.com">Always Learning</a>
        </div>
       </div>
    </div>
  
     <div class="subnav">
         <li>
     <Link className="subnavbtnSpec floatEventsText" to="/">Join Us<i class="fa fa-caret-down"></i></Link>
       <div class="subnav-content">
        <div class="subnav-trapezoid">
          <Link className="refSub subText" to="/register">Register to Play</Link>
          <Link className="refSub subText" to="/login">Login in to Join</Link>
         </div>
       </div>
          </li>
      </div>
  </div>
</nav>
    )
}
// export const NavBar = (props) => {
//     return (
//         <ul className="navbar">
//             <li className="navbar__item">
//             <Link className="navbar__link" to="/login">Login</Link>
//             </li>
//             <li className="navbar__item">
//             <Link className="navbar__link" to="/">Games</Link>
//             </li>
//             <li className="navbar__item">
//             <Link className="navbar__link" to="/events">Events</Link>
//             </li>
//             <li className="navbar__item">
//             <Link className="navbar__link" to="/profile">Profile</Link>
//             </li>
//             <li className="navbar__item">
//             <Link className="navbar__link" to="/register">Sign Up</Link>
//             </li>
//             {
//                 (localStorage.getItem("lu_token") !== null) ?
//                     <li className="nav-item">
//                         <button className="nav-link fakeLink"
//                             onClick={() => {
//                                 localStorage.removeItem("lu_token")
//                                 props.history.push({ pathname: "/" })
//                             }}
//                         >Logout</button>
//                     </li> :
//                     <>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/login">Login</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/register">Register</Link>
//                         </li>
//                     </>
//             }        </ul>
//     )
// }
