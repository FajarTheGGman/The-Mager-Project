import { StatusBar } from 'expo-status-bar';
import React, { Component, useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Switch, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Camera } from 'expo-camera'
import { BarCodeScanner } from 'expo-barcode-scanner'
import DialogInput from 'react-native-dialog-input'
import Spinner from 'react-native-loading-spinner-overlay'
import SwitchToggle from 'react-native-switch-toggle'

class Main extends Component{
constructor(props){
super(props)

    this.state = {
        day: "",
        copyright: "{'Coder': 'FajarTheGGman'}",
        dayIcon: null
    }
}

componentDidMount(){
    let waktu_init = new Date();
    let waktu = waktu_init.getHours();

    if(waktu > 6){
        this.setState({ day: "Selamat Pagi" })
        this.setState({ dayIcon: require('./assets/sun.png') })
    }

    if( waktu > 17 ){
        this.setState({ day: "Selamat Malam" })
        this.setState({ dayIcon: require('./assets/moon.png') })
    }
}

render(){
  return (
    <View style={styles.container}>
        <View style={styles.top}>
            <Text style={styles.title}>{this.state.day}</Text>
            <Image source={this.state.dayIcon} style={{ width: 45, height: 45, marginLeft: 20, backgroundColor: 'white', borderRadius: 15 }}/>
        </View>

        <View style={{ alignItems: 'center', marginTop: -75,}}>
            <Image source={require("./assets/banner.png")} style={{ width: 90, height: 90 }}/>
            <Text style={{ fontSize: 20, marginTop: 5, backgroundColor: "black", color: "white", padding: 5, borderRadius: 15, paddingLeft: 15, paddingRight: 15}}>The Mager Project</Text>
            <Text style={{ marginTop: 5, fontSize: 17}}>{this.state.copyright}</Text>
        </View>

        <Text style={{ marginTop: 35, color: "white", padding: 5, borderRadius: 10, width: 100, textAlign: "center", fontSize: 25, backgroundColor: "#000457" }}>Menu</Text>
        <View style={styles.menu}>
            <TouchableOpacity style={{ width: 80, height: 80 }} onPress={() => this.props.navigation.navigate('Scan Kode QR')}>
                <Image source={require('./assets/menu/qr.png')} style={styles.threedimensi}/>
            </TouchableOpacity>

            <TouchableOpacity style={{ width: 80, height: 80, marginLeft: 55 }} onPress={() => this.props.navigation.navigate('Manual')}>
                <Image source={require("./assets/menu/manual.png")} style={styles.manual}/>
            </TouchableOpacity>
        </View>
      <StatusBar style="auto" />
    </View>
  );
}
}

class Manual extends Component{
    constructor(props){
        super(props)

        this.state = {
            relayone: false,
            relaytwo: false,
            relaythree: false,
            relayfour: false,

            loading: false,
            ip: "",
            dialog: true,
	    suhu: "",
        }
    }

    relaysatu(){
        this.setState({ relayone: !this.state.relayone })

        if(this.state.relayone == false){
            fetch('http://' + this.state.ip + '/relay1').then(respon => {
                if(respon.status == 200){
                    alert("Relay 1 menyala")
                }else{
                    alert("Relay 1 Error")
                }
            })
        }else if(this.state.relayone == true){
            fetch("http://" + this.state.ip + "/relay1mati").then(respon => {
                if(respon.status == 200){
                    alert("Relay 1 mati")
                }else{
                    alert("Relay 1 error")
                }
            })
        }
    }


 relaydua(){
        this.setState({ relaytwo: !this.state.relaytwo })

        if(this.state.relaytwo == false){
            fetch('http://' + this.state.ip + '/relay2').then(respon => {
                if(respon.status == 200){
                    alert("Relay 2 menyala")
                }else{
                    alert("Relay 2 Error")
                }
            })
        }else if(this.state.relaytwo == true){
            fetch("http://" + this.state.ip + "/relay2mati").then(respon => {
                if(respon.status == 200){
                    alert("Relay 2 mati")
                }else{
                    alert("Relay 2 error")
                }
            })
        }
    }

relaytiga(){
        this.setState({ relaythree: !this.state.relaythree })

        if(this.state.relaythree == false){
            fetch('http://' + this.state.ip + '/relay3').then(respon => {
                if(respon.status == 200){
                    alert("Relay 3 menyala")
                }else{
                    alert("Relay 3 Error")
                }
            })
        }else if(this.state.relaythree == true){
            fetch("http://" + this.state.ip + "/relay3mati").then(respon => {
                if(respon.status == 200){
                    alert("Relay 3 mati")
                }else{
                    alert("Relay 3 error")
                }
            })
        }
    }

relayempat(){
        this.setState({ relayfour: !this.state.relayfour })

        if(this.state.relayfour == false){
            fetch('http://' + this.state.ip + '/relay4').then(respon => {
                if(respon.status == 200){
                    alert("Relay 4 menyala")
                }else{
                    alert("Relay 4 Error")
                }
            })
        }else if(this.state.relayfour == true){
            fetch("http://" + this.state.ip + "/relay4mati").then(respon => {
                if(respon.status == 200){
                    alert("Relay 4 mati")
                }else{
                    alert("Relay 4 error")
                }
            })
        }
    }

    generateIP(x){
        const data = x;
        this.setState({ ip: data });
        this.setState({ loading: true });
        this.setState({ dialog: false })

        fetch("http://" + data).then(respon => {
            this.setState({ loading: false })
            if(respon.status == 200){

            }else{
                alert("[!] Koneksi ke server nodemcu error, cek ip nodemcu lagi")
            }
         })

        fetch('http://' + data + "/temperature").then(res => res.text()).then(x => {
            if(x == "nan"){
                this.setState({ suhu: "Module DHT11 Belum Terpasang" })
            }else{
                this.setState({ suhu: x + " 🌡️"})
            }
        })

	}

    render(){
        return(
            <View style={{ backgroundColor: '#000457', flex: 1, alignItems: "center" }}>
                <DialogInput isDialogVisible={this.state.dialog} title={"Masukkan IP Nodemcu kamu"} hintInput={"Contoh : 192.168.1.2"} submitInput={(data) => this.generateIP(data)} closeDialog={() => this.props.navigation.navigate('Home')}/>
                <Spinner visible={this.state.loading} textContent={"Tunngu bentar gan."} textStyle={{ color: 'white' }}/>

        		<Text style={{ color: "black", backgroundColor: 'white', textAlign:"center", width: 190, fontSize: 25, borderRadius: 15, marginTop: 55}}>Mode Manual</Text>
        		<Text style={{ color: "black", backgroundColor: 'white', textAlign:"center", width: 190, fontSize: 20, borderRadius: 15, marginTop: 15}}>{this.state.suhu}</Text>

                <View style={{marginTop: 100, borderRadius: 15, flex: 1, flexDirection: "row",  backgroundColor: "black"}} >
                    <SwitchToggle style={{  }} switchOn={this.state.relayone} onPress={() => this.relaysatu()} />
		    <Text style={{ color: "black", marginLeft: 120, fontSize: 30, marginBottom: 55, height: 45, borderRadius: 15, width: 144, backgroundColor: 'white' }}>Relay Satu</Text>
                </View>
                <View style={{ marginTop: 45, borderRadius: 15,  flex: 1, flexDirection: "row",  backgroundColor: "black"}} >
                    <SwitchToggle style={{  }} switchOn={this.state.relaytwo} onPress={() => this.relaydua()} />
		    <Text style={{ color: "black", marginLeft: 120, fontSize: 30, marginBottom: 55, height: 45, borderRadius: 15, width: 144, backgroundColor: 'white' }}>Relay Dua</Text>
                </View>
		<View style={{ marginTop: 45, borderRadius: 15, flex: 1, flexDirection: "row",  backgroundColor: "black"}} >
                    <SwitchToggle style={{  }} switchOn={this.state.relaythree} onPress={() => this.relaytiga()} />
		    <Text style={{ color: "black", marginLeft: 120, fontSize: 30, marginBottom: 55, height: 45, borderRadius: 15, width: 144, backgroundColor: 'white' }}>Relay Tiga</Text>
                </View>
		<View style={{ marginTop: 45, marginBottom: 40, borderRadius: 15, flex: 1, flexDirection: "row",  backgroundColor: "black"}} >
                    <SwitchToggle style={{  }} switchOn={this.state.relayfour} onPress={() => this.relayempat()} />
		    <Text style={{ color: "black", marginLeft: 90, fontSize: 30, marginBottom: 0, height: 45, borderRadius: 15, width: 170, backgroundColor: 'white' }}>Relay Empat</Text>
                </View>
            </View>
        )
    }
}

function QR({ navigation }){
    const [btn, setBtn] = useState(false)
    const [akses, setAkses] = useState(false)
    const [dialog, setDialog] = useState(true)
    const [ip, setIp] = useState('')
    const [route, setRoute] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async() => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            if(status == "granted"){
                setAkses(true)
            }else{
                setAkses(false)
            }
        })()
    },[])

    const ipGenerate = (hasil) => {
        setIp(hasil)
        setDialog(false)
    }

        return (
            <View style={{ flex: 1 }}>

                <Spinner visible={loading} textContent={"Tunggu bentar gan."} textStyle={{ color: 'white' }}/>
                <DialogInput isDialogVisible={dialog} title={"Masukkan IP nodemcu kamu"} hintInput={"Contoh: 192.168.1.2"} submitInput={(data) => ipGenerate(data)} closeDialog={() => navigation.navigate('Home')}/>

                <View style={styles.bartitle}>
                    <Text style={styles.barteks}>IP Nodemcu : {ip}</Text>
                </View>

                <BarCodeScanner style={styles.barcode} onBarCodeScanned={btn ? undefined : ({ type, data }) => { 
                    setBtn(true)
                    setLoading(true)
                    
                    fetch('http://' + ip + "/" + data).then(res => {
                        setLoading(false)
                        if(res.status == 200){
                            if(data == "relay1"){
                                alert("relay 1 nyala")
                            }else if(data == "relay2"){
                                alert("relay 2 nyala")
                            }else if(data == "relay3"){
                                alert("relay 3 nyala")
                            }else if(data == "relay4"){
                                alert("relay 4 nyala")
                            }else if(data == "relay1mati"){
                                alert("relay 1 mati")
                            }else if(data == "relay2mati"){
                                alert("relay 2 mati")
                            }else if(data == "relay3mati"){
                                alert("relay 3 mati")
                            }else if(data == "relay4mati"){
                                alert("relay 4 mati")
                            }
                        }else{
                            alert("Salah Kode QR ")
                        }
                    })
                    
                    
                    
                }} style={{ flex:1 }}/>

                {btn && <Button title={'Scan Lagi ? '} color='#000457' onPress={() => setBtn(false)} />}

            </View>
        )
    }

const stack = createStackNavigator();

export default function App(){
    return(
        <NavigationContainer>
            <stack.Navigator initialRouteName="Home">
                <stack.Screen name='Home' component={Main}/>
                <stack.Screen name='Scan Kode QR' component={QR}/>
                <stack.Screen name='Manual' component={Manual}/>
            </stack.Navigator>
        </NavigationContainer>
    )
}

const manual = StyleSheet.create({
    back: {
        backgroundColor: "#000457"
    }
})

const styles = StyleSheet.create({
    barcode: {
        paddingLeft: 150,
        paddingRight: 150
    },

    title: {
        marginTop: 3,
        fontSize: 25,
        color: 'white',
        marginLeft: 15
    },

    bartitle: {
        backgroundColor: "#000457",
        alignItems: 'center',

    },

    barteks: {
        textAlign: 'center',
        color: "white",
        fontSize: 20,
    },

    threedimensi: {
        width: 80,
        height: 80,
        borderRadius: 15,
        backgroundColor: 'white'
    },

    manual: {
        width: 80,
        height: 80,
        backgroundColor: 'white',
        padding: 35,
        borderRadius: 15
    },

    menu: {
        backgroundColor: "#000457",
        padding: 20,
        marginTop: 15,
        borderRadius: 20,
        height: 10,
        flex: 1,
        flexDirection: 'row',
        marginBottom: 35
    },

    top: {
        backgroundColor: '#000457',
        padding: 15,
        width: 300,
        borderRadius: 20,
        marginTop: 25,
        marginBottom: 120,
        flexDirection: "row"
    },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
