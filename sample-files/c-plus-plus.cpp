/*
    Sample C++ code to show & test syntax highlighting.
    Written from scratch.
*/
#include <iostream>
using namespace std;

int main(){
  // sample comment
  int a = 10;
  int b{10};

  int arr[2][2] = {{1,2},{9,10}}

  string sample = "sample string";

  for(int i = 0; i < 2; i++){
    cout << sample;
    cout << &sample;
    int c{a+b};
  } 

  cout << c;
}