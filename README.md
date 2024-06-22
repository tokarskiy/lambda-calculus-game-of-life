# λ-calculus implementations of Conway's Game of Life

An implementation of Conway's Game of Life written in JavaScript using λ-calculus.
The full implementation contains in [lambda-calculus.js](src/backend/lambda-calculus.js) file. 

Rules being used for building terms:

1. Function parameter or alias to previously defined terms:

    ```javascript
    x
    ```

2. Creating alias for term:

    ```javascript
    const x = $TERM$;
    ```

3. Lambda abstraction:

    Lambda is a function taking one argument and returning some value.

    There's two ways to define an lambda abstraction: 

    ```javascript 
    (x) => $TERM$
    ```

    or 

    ```javascript
    (x) => {
        const y = $TERM_Y$; 

        return $RETURN_TERM$;
    }
    ```
    
    Every lambda function should contain only one return statement (inner functions
    do not count).

4. A function application: 

    ```javascript 
    fun(arg)
    ```

    It is forbidden to use recursion:
    ```javascript
    const fun = (x) => {
        return fun(x); /* FORBIDDEN */
    };
    ```

These rules mean, that it's forbidden to use any libraries (even stdlib), 
primitives, classes, `if`s, `while`s, arrays, mutable states, objects, 
lambdas returning void or with 0, 2 or more arguments and other things. 
The only building block is lambda function, taking 1 argument and returning value. 

Rules above may be ignored only in modules, responsible for unit testing 
or interaction with "outer world" (console.log). These modules are defined in 
files [lambda-calculus.test.ts](tests/backend/lambda-calculus.test.ts),
[lambda-calculus.frontend.ts](src/frontend/lambda-calculus.frontend.ts),
[conway-game-of-life.frontend.ts](src/frontend/conway-game-of-life.frontend.ts).

This app is created for educational purposes. The performance of this app is 
extremely low, this is **not** a way how read-world apps are being written.

Run the app using command:

```shell
deno task game-of-life
```

