<template>
	<v-container>
	  	<v-layout row wrap>
	  		<v-flex md12 xs12> 

	            <article>
	                <h1 class="display-2 mb-2">About Us</h1>
	            	
	   
	            	<p>
                      	Betaplace.com.ng is a dedicated web application built and managed Chinedu Dimonyeka and team, with the sole purpose of reducing the time taken to find and rent accomodation.
	                </p>
	                <p>
                      	This project was inspired and intended to help stranded NYSC members or relocating families in search for accomodation.
	                </p>
	                <p>
                      	Betaplace.com.ng is not affliated to any estate agency company. 
	                </p>

	                <h2 class="display-1">Contact Us</h2>
	   
	            	<p>
                        Contact Email: {{ contact_email }} <br>
                        Phone Number: {{phone_number_one }}, {{phone_number_two}} 
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
				phone_number_one: process.env.PHONE_NUMBER_HELP_ONE,
				phone_number_two: process.env.PHONE_NUMBER_HELP_TWO

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