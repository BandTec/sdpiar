#include <dht.h>


#define dht_dpin A5 //Pino DATA do Sensor ligado na porta Analogica A5

dht DHT; //Inicializa o sensor

void setup()
{
  Serial.begin(9600);
  delay(1000);//Aguarda 1 seg antes de acessar as informações do sensor
}

void loop()
{
  DHT.read11(dht_dpin); //Lê as informações do sensor
  Serial.print(DHT.temperature); 
  Serial.print(' ');
  Serial.println(DHT.humidity);
  //Serial.println(" Celsius  ");

//O ideal é a leitura a cada 2 segundos
  delay(10000);  
}
