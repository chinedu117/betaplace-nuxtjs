<template>
  <v-container>
  	<v-layout row wrap>
  		<v-flex md12 xs12> 

  			<header>
  				<h1 class="display-2 mb-2"> Privacy</h1>
  			</header>

            <article>
       
            	<h2 class="display-1" id="introduction">Information We Collect</h2>
   
            	<p>

            	 
					In running and maintaining this website we may collect and process the following data about you:
					<ul>
						<li>We collect information about your visit to our site. Such as the places or pages viewed, clicks and traffic data information, location data and other communication data. We use this information to improve our services.</li>
						<li>The information you provide willingly. Such as your email, phone number or address and other personal information.</li>
						<li>We also keep information that you provide when you communicate to us by any means.
					     </li>
						<li>Third party profile information such as your facebook or gmail public profile information.</li>
					</ul>
					
               </p>
            	


            	<h2 class="display-1" id="introduction">Use of Cookies</h2>

            	<p>
	            	<p>Cookies provide information regarding the computer used by a visitor. We may use cookies where appropriate to gather information about your computer in order to assist us in improving our website.
	            	</p>
					<p>We may gather information about your general internet use by using the cookie. Where used, these cookies are downloaded to your computer and stored on the computer’s hard drive. Such information will not identify you personally. It is statistical data. This statistical data does not identify any personal details whatsoever.
					</p>
					<p>Our advertisers may also use cookies, over which we have no control. Such cookies (if used) would be downloaded once you click on advertisements on our website.You can disable cookies clicking “Clear Cookies” in your browser.
					</p>
				</p>
     
            	<h2 class="display-1" id="introduction">Use of Your Information</h2>

            	<p>
            	 We use the information that we collect from you to provide our services to you. In addition to this we may use the information for one or more of the following purposes:
                      <ul>
                      	<li>To provide information to you that you request from us relating to our products or services.</li>
                      	<li>To provide information to you relating to other products that may be of interest to you. Such additional information will only be provided where you have consented to receive such information.</li>
                      	<li>To inform you of any changes to our website, services or goods and products.</li>
                      </ul>

                      <p>If you have previously purchased goods or services from us we may provide to you details of similar goods or services, or other goods and services, that you may be interested in.
                      					 Where your consent has been provided in advance we may allow selected third parties to use your data to enable them to provide you with information regarding unrelated goods and services which we believe may interest you. Where such consent has been provided it can be withdrawn by you at any time.
                      </p>
            	</p>
            	


            	<h2 class="display-1" id="introduction">Storing Your Personal Data</h2>

            	<p>
            	In operating our website it may become necessary to transfer data that we collect from you to locations outside of your country for processing and storing. By providing your personal data to us, you agree to this transfer, storing or processing. We do our upmost to ensure that all reasonable steps are taken to make sure that your data is treated stored securely.
				Unfortunately the sending of information via the internet is not totally secure and on occasion such information can be intercepted. We cannot guarantee the security of data that you choose to send us electronically, sending such information is entirely at your own risk.
				</p>
            	

            	<h2 class="display-1" id="introduction">Disclosing Your Information</h2>

            	<p>
            	We will not disclose your personal information to any other party other than in accordance with this Privacy Policy and in the circumstances detailed below:
                        <ul>
                        	<li>In the event that we sell any or all of our business to the buyer.</li>
                        	<li>Where we are legally required by law to disclose your personal information.</li>
                        	<li>To further fraud protection and reduce the risk of fraud.</li>
                        </ul>
               </p>

     
              <h2 class="display-1" id="introduction">Third Party Links</h2>

            	<p>
            	On occasion we include links to third parties on this website. Where we provide a link it does not mean that we endorse or approve that site’s policy towards visitor privacy. You should review their privacy policy before sending them any personal data.
               </p>

               <h2 class="display-1" id="introduction">Access to Information</h2>

            	<p>
            	In accordance with our internal policy you have the right to access any information that we hold relating to you. Please note that we reserve the right to charge a fee of N2000 to cover costs incurred by us in providing you with the information.
               </p>

               <h2 class="display-1" id="introduction">Contacting Us</h2>

            	<p>
				Please do not hesitate to contact us regarding any matter relating to this Privacy Policy at {{ contact_email }}
            	
               </p>


            </article>
  		</v-flex>
  	</v-layout>
  </v-container>
</template>
<script type="text/javascript">
	
	export default {
		layout: 'default',
		asyncData(){
			return {
				contact_email: process.env.CONTACT_EMAIL,
				
			}
		}
	}
</script>
<style lang="stylus" scoped>

.main_link,.sub_link
	color: red
	text-decoration: none
	list-style: none

.main_link a::before,.sub_link a::before
	content: "# "
	margin-left: -20px 

.main_link:hover,.sub_link:hover
	color: grey
.sub_link
	font-size: 18px
	font-weight: 300
.sub_link a
	text-decoration: none
.main_link
	font-size: 24px
	font-weight: 700
p
	line-height: 1.9
	font-size: 18px
article, header
	padding:25px 205px 50px 120px
header
	margin-bottom: 15px
.anc::before
	content: "#";
	margin-left: -35px;
	margin-bottom: -55px
	position: absolute;
	font-size: 28px;
	color: #f4645f;
	opacity: .6;
	color: red
a
	text-decoration: none !important
h2 a
	color: black !important
h4 a
	color: black !important

article h2:first-of-type
	margin-top: -10px
	margin-bottom: 10px

article h2, article h4
	margin-top: 20px
	margin-bottom: 10px

@media screen and (max-width: 1080px)
	article, header
		padding: 15px 2px 30px
	p
		line-height: 1.9
		font-size: 16px
	.main_link
		font-size: 18px
	.sub_link
		font-size: 16px
</style>