int pinoSensor=0;                 //Saída do sensor na A0
int valorLido=0;                  //Variável auxiliar
float temperatura=0;              //Variável que armazenará a temperatura lida
int linha=0;                      //Variável que se refere as linhas do excel

void setup() {                                           //Função que será executada uma
Serial.begin(9600);                                      //Inicia a comunicação serial a 9600 bauds
Serial.println("CLEARDATA");                             //Reset comunicação serial
Serial.println("LABEL,Hora,Temperatura,Linha");          //Nomeia a coluna
}
void loop() {                             //Função que será executada continuamente
valorLido=analogRead(pinoSensor);         //Leitura analógica da porta A0
temperatura=(valorLido*0.00488);          //5 volts/1023=0,0048 precisão do A/D
temperatura=temperatura*100;              //Converte milivolts para celsius-cada 10mV==1 grau Cº
linha++;                                  //incrementa linha para que a leitura pule linha
Serial.print("DATA,TIME,");               //Inicia a impressão dos dados, fica sempre iniciando
Serial.print(temperatura);
Serial.print(",");
Serial.println(linha);

if(linha>100)                      //Loop para limitar a quantidade de dados
{
  linha=0;
  Serial.println("ROW,SET,2");     //Alimentação das linhas sempre com os dados iniciados
}
delay(1000);                       //Tempo 5 segundos para realizar outra leitura
}
