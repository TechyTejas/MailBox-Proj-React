import React from 'react'
import classes from './Footer.module.css'
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';


function Footer() {

  
  return (
    <div className={classes.divstyle}>
    <footer >
    {/* <div className={classes.footer2}> Footer Part </div> */}
    <div className={classes.footer}>
      <ol className={classes.li}>
      <h2 style={{color:"black"}}>Shop</h2>
        <li>Men's Clothing</li>
        <li>Women's Clothing</li>
        <li>Electronics</li>
        <li>Mobiles & Watches</li>
      </ol>
      
      <ol  className={classes.li}>
        <h2 style={{color:"black"}}>About</h2>
        <li>About</li>
        <li>Contact Us</li>
        <li>Privacy Policy</li>
        <li>Terms and Conditions</li>
      </ol>
      
      <div>
     
      <ui className={classes.footerIconsUL}>
       
        <li className={classes.footerIconsLI}>
            <a href='https://www.facebook.com' className={classes.achor }>
            <InstagramIcon style={{color:"purple"}}/>
            </a> 
        </li>

        <li className={classes.footerIconsLI}>
            <a href='https://www.youtube.com/' className={classes.achor }>
            <YouTubeIcon style={{color:"red"}}/>
            </a>
         </li>

        <li className={classes.footerIconsLI}>
            <a href='https://www.spotify.com' className={classes.achor }>
            <TwitterIcon style={{color:"blue"}}/>
            </a> 
        </li>

      </ui>
      </div>
    </div>
   

  </footer>
  Tejas Sadade 2023 All Rights are reserved..
      </div>
  )
}

export default Footer