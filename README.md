# gundam
thread
Lazy Evaluation(지연연산)
이전에 이야기 했던 것처럼 중간연산(intermediate evaluation)과 최종연산(Terminal Evaluation)이 존재한다.
Lazy Evaluation은 최종연산이 실행되면서 중간연산이 진행된다는 것이다.

이를 통해 필요할 때만 사용할 수 있으므로 성능이 최적화 될 수 있으며 같은 이유로 메모리를 효율적으로 사용할 수 있다. 또한 중간연산에서 불필요한 계산을 줄일 수 있어 연산을 최적화할 수 있다.
물론 이러한 상황이라면 단점도 없을 수는 없다. 가장 중요한 것이라고 생각되는 단점은 디버깅이 어렵다고 생각이 든다. 물론 peek()라는 메서드가 존재하지만 중간중간 peek메서드를 사용해야하는 불편함이 존재한다.
또한 필요하지 않는데이터를 stream으로 동작하려할 때 메모리 누수가 일어날 수 있고 이를 방지하고자 close()를 사용하는 것이 중요하다고 생각한다.
