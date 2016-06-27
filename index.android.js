/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
  DatePickerAndroid,
  View
} from 'react-native';

var REQUEST_URI = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';

class NasaApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nasaData: null,
    };
  }    
    
  render() {
    if (!this.state.nasaData) {
        return this.renderInitialView();
    }
    else {
        return this.renderMainView();
    }
  }
  
 renderInitialView() { 
     return (        
         <View style={styles.container}> 
            <View style={styles.mainheader}>
                <Text style={styles.headertext}>NasaApp</Text>
                <TouchableHighlight style={styles.button} underlayColor='#99d9f4' onPress={this.onLoadPressed.bind(this)}> 
                    <Text style={styles.buttonText}>Load Image</Text>
                </TouchableHighlight>    
                <TouchableHighlight style={styles.button} underlayColor='#99d9f4' onPress={this.onRandomPressed.bind(this)}> 
                    <Text style={styles.buttonText}>Load Random</Text>
                </TouchableHighlight>                     
             </View>            
         </View> 
    ); 
 }  
  
renderMainView() {
	return {
		<View style={styles.container}>
			<View style ={styles.header}>
				<View style={styles.header}>
					<TouchableHighlight style={styles.button} underlayColor='#99d9f4' onPress={this.onLoadPressed.bind(this)}> 
						<Text style={styles.buttonText}>Load Image</Text>
					</TouchableHighlight>    
					<TouchableHighlight style={styles.button} underlayColor='#99d9f4' onPress={this.onRandomPressed.bind(this)}> 
						<Text style={styles.buttonText}>Load Random</Text>
					</TouchableHighlight>                     
				 </View> 
			</View>
			<View style={styles.copyright}>
				<Text>Copyright: {this.state.nasaData.copyright}</Text>
			</View>
			<View style={styles.image}>        
				<Image source={{uri: this.state.nasaData.url}} style={{width: 400, height: 400}} />
			</View>
			<ScrollView ref='scrollView' keyboardDismissMode='interactive' style={styles.scrollView}>
				<Text style={styles.footer}>{this.state.nasaData.explanation}</Text>
			</ScrollView>
		</View>
	};
}
  
 onLoadPressed() {
     fetch(REQUEST_URI) 
        .then((response) => response.json()) 
        .then((responseData) => { 
            this.setState({ 
                nasaData: responseData, 
            }); 
        }) 
        .done();
    }

    onRandomPressed() {
     var randomUri = REQUEST_URI +  "&date=" + randomDate(new Date(2015, 0, 1), new Date());    

     fetch(randomUri) 
        .then((response) => response.json()) 
        .then((responseData) => { 
            this.setState({ 
                nasaData: responseData, 
            }); 
        }) 
        .done();
    }
}

// based on https://gist.github.com/miguelmota/5b67e03845d840c949c4
function randomDate(start, end) {
    var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    
    var dat = date.getDate();
    var month = date.getMonth() + 1;
    var yr = date.getFullYear();
    
    return yr + "-" + month + "-" + dat;
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'transparent',
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 5,
        paddingRight: 5,
    },
    scrollView: {
        flex: .2,
    },
    copyright: {
        flex: .1,
    },    
    mainheader: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .1,
        backgroundColor: 'transparent'
    },    
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: .1,
        backgroundColor: 'transparent'
    },
    headertext: {
        fontSize: 20,
        paddingBottom: 10,
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .5,
        backgroundColor: 'transparent',
        fontSize: 12,  
    },    
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'transparent',
    },
    buttonText: {
        fontSize: 14,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 30,
        width: 130,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'center'
    },    
});

AppRegistry.registerComponent('NasaApp', () => NasaApp);
