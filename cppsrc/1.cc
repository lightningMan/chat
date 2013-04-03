#include <iostream>
using namespace std;

void swap(int& a, int& b)
{
  int t = a;
  a = b;
  b = t;
}

void out(int a[], int cur, int n)
{
  if (cur == n)
  {
    for (int i = 0; i < n; ++i)
      cout << a[i] << " ";
    cout << endl;
  }
  for (int i = cur; i < n; ++i)
  {
    swap(a[cur], a[i]);
    out(a, cur + 1, n);
    swap(a[cur], a[i]);
  }
}

int main()
{
  int a[5] = {1, 2, 3, 4, 5};
  out(a, 0, 5);
  return 0;
}