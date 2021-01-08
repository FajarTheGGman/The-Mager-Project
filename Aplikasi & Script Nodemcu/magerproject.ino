// Copyright© 2020 By Fajar Firdaus
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include "DHT.h";

DHT temperature(D7, DHT11);

// nama ssid dan password ssid
char* wifi = "ServerIOT";
char* password = "fajarfirdaus";

// inisialisasi web server untuk nodemcu
ESP8266WebServer server(80);

// Temperature page
void temp(){
  float data = temperature.readTemperature();
  server.send(200, "text/plain",  String(data));
}

// Relay Mode nyala

void relaysatu(){
   server.send(200, "text/plain", "{'Relay1': 'Menyala'}");
   digitalWrite(D0, LOW);
}

void relaydua(){
  server.send(200, "text/plain", "{'Relay2': 'Menyala'}");
  digitalWrite(D1, LOW);
}

void relaytiga(){
  server.send(200, "text/plain", "{'Relay3': 'Menyala'}");
  digitalWrite(D2, LOW);
}

void relayempat(){
  server.send(200, "text/plain", "{'Relay4': 'Menyala'}");
  digitalWrite(D3, LOW);
}

// Relay Mode Mati

void relaysatumati(){
   server.send(200, "text/plain", "{'Relay1': 'Mati'}");
   digitalWrite(D0, HIGH);
}

void relayduamati(){
  server.send(200, "text/plain", "{'Relay2': 'Mati'}");
  digitalWrite(D1, HIGH);
}

void relaytigamati(){
  server.send(200, "text/plain", "{'Relay3': 'Mati'}");
  digitalWrite(D2, HIGH);
}

void relayempatmati(){
  server.send(200, "text/plain", "{'Relay4': 'Mati'}");
  digitalWrite(D3, HIGH);
}

// Main Function

void setup() {
  Serial.begin(115200);
  temperature.begin();
  
  WiFi.mode(WIFI_STA);
  WiFi.begin(wifi, password);

  // Relay
  pinMode(D0, OUTPUT);
  pinMode(D1, OUTPUT);
  pinMode(D2, OUTPUT);
  pinMode(D3, OUTPUT);

  // Buzzer
  pinMode(D6, OUTPUT);

  // LED Built-in
  pinMode(LED_BUILTIN, OUTPUT);

  // Tunggu konek ke wifi
  while(WiFi.status() != WL_CONNECTED){
    delay(50);
    Serial.print("*");
  }
  
  // Banner 
  Serial.println("\n{");
  Serial.print("  'Coder'  : 'FajarTheGGman'\n");
  Serial.println("  'Twitter' : '@kernel024'  ");
  Serial.print("  'Your IP' : ");
  Serial.println(WiFi.localIP());
  Serial.print("}");


  // Routing URL

  // Index
  server.on("/", [](){
     server.send(200, "text/plain", "{ Selamat Datang di server }");
  });

  // Routing Relay akif
  server.on("/relay1", relaysatu);
  server.on("/relay2", relaydua);
  server.on("/relay3", relaytiga);
  server.on("/relay4", relayempat);

  // Routing Relay Mati
  server.on("/relay1mati", relaysatumati);
  server.on("/relay2mati", relayduamati);
  server.on("/relay3mati", relaytigamati);
  server.on("/relay4mati", relayempatmati);
  server.on("/temperature", temp);
  
  server.begin();
}

void loop() {
  server.handleClient();
  delay(500);
  digitalWrite(LED_BUILTIN, HIGH);
  delay(500);
  digitalWrite(LED_BUILTIN, LOW);
  delay(500);

  float suhu = temperature.readTemperature();
  if(suhu > 39){
     digitalWrite(D6, HIGH);
  }else{
     digitalWrite(D6, LOW);
  }
  
}
