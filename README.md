# DT History (@peter.naydenov/dt-history)
*UNDER HEAVY DEVELOPMENT*



State-history manager for javascript based on DT-model. Self sufficient. 
 - No framework dependencies;
 - No browser dependencies;
 - No other javascript API dependencies;
 - Works in node.js and browsers;
 - Build a history-objects with all needed state-data inside;
 - State-data in history-objects is searchable;
 - Trace back the history of state-data;
 - Build a reports on existing data;



// OPTIONALS:
- Define variables as state-variables. State-variables will be collected on each 'push';
- Define history-object: collection of variables;
  many properties with a deep structure;

## Methods

```js
  // I/O Operations
  save    : 'Add a new history step. Returns a history name.'

// Get a history object
, get     : 'Get a history object with specific name'
, where   : 'Search back with conditions. Multiple conditions requests are possible'
, trace   : 'Create a historical list for specified dt-line, dt-line/key'

// Move current marker 
, back    : 'Return the last saved state'
, go      : 'Move current marker forward/backword'
```

Library has own current marker but library works fine without using it.
State should contains all data needed(variable values), because history make sense
State history make sense only when all state related data goes together. That's a history object;



Possible 'where' condition descriptors. Descriptiors are not required:
- location    : History object has location(dt-line breadcrumbs);
- notLocation : History object doesn't have specified location;
- key         : Search for key;
- notKey      : Ignore history object if key exists;
- value       : Search for specified value
- notValue    : Expect value to be different of specified;

If `location` is not set: Will test all DT-lines for other descriptors;
If `notLocation` is set: Will search all DT-lines if history object don't have line with such location(breadcrumbs);
if `location` is set: Will search for other descriptors on specified location. If location is missing, will take next history object until location is available;


Possible








IDEAS: 
- We can have some predefined names like `initial`, `last`



```js
// Samples:

let history = new dtHistory ({ // set history params
                            limit: 10  // how many history-objects can collect current store. Default: no limit
                        })

// Save a new history-object. Can contain many variables because is a DT-model.
history.save ( data, name )   // 'name' is not required


history.back ()      // Will return last saved state. Default steps = 0
history.back ( 2 )   // Will return 2 state-steps back.

// Search for last appearance of object definied by breadcrumbs, key, and value
history.where ([ 
            { location: 'root/user/properties', key:'name', value:'Ivan' } 
        ])  

// Search for last appearance where object 'root/user/properties' has a key 'name'
history.where ([ 
            { location: 'root/user/properties', key: 'name' }
        ])

// Search for last appearance where object 'root/user/properties' exists
history.where ([ 
        { location: 'root/user/properties' }
        ])

// Search for key/value without specified location.
history.where ([
            { key: 'name', value: 'Ivan' }
        ])

// Search for history object, where key is 'name' and object doesn't have key 'age',  value of 'key' is different of 'Ivan'
history.where ([
            { key: 'name', notValue: 'Ivan', notKey: 'age' }
        ])

// the same 'where' request but different 
history.where ([
              { key: 'name', notValue: 'Ivan' }
            , { notKey: 'age' }
        ])

// Search for value 'Ivan', no matter the location and keys
history.where ([
        { value: 'Ivan' }
    ])

// where as a callback function
history.where ( ({ 
                dt,        // the history-object as a dt-object
                select,    // a function to set current history-object as selected
                finish,     // a function to set current history-object as selected and finish with searching
                end        // boolean flag. Set to true if all history-objects are checked.
                }) => {
                        dt.query ( store => {
                                        store.look ( ({name, flatData}) => {
                                                    if ( name === 'user' ) {
                                                            if ( flatData.toHaveOwnProperty ( 'age' ) )   select()
                                                        }
                                                    return 'next'
                                            })
                                        if ( end )   select ()
                                })
            })



// Create a history-report
function scanFn ({ // possible named arguments:
                  counter     // steps counter for 
                , response    // dt-store to collect a requested data
                , buffer      // object that can be accessed from all 
                , dt          // the history-object as a dt-object
                , end        // when all dt-lines of all history-objects objects were scaned. Last execution of the function
    }) {
            // Function will be executed on each dt-line for each history object
            // To stop scanning and continue with next history object: return 'next'
            if ( counter === 0 ) {
                        response.set ( 'root', [] )  // response: It's a dt-store. Build a result here.
                        dt.query ( store => {
                                  store.look ( ({ name, flatData }) => {
                                            // ...look inside history object dt-lines
                                            // and set your response structures and properties
                                      })
                            })
                        return
                }
            
} // scanFn func.
history.report( scanFn ).model ( store => ({as:'std'})   )





// Trace history for specific dt-line/key
history.trace ({ location: 'root', key: 'name' })  // Will search for history of top level property 'name'. 
// Response is aray of values like: [ 'Ivan', 'Stefan', null, 'Petko']
// Where first value is the newest one. Value null mean that the key was not set in some of the history objects

// Trace for dt-line
history.trace ({location:'root/user'})
// Will return array of flatData of specified dt-line location(breadcrumbs).
// Example: [ {name:'Ivan'}, {name:'Stefan'}, {}, {name:'Petko'}]








// Posssible solution
history.scan ([
    {
        diraction: 'backwords'
        , fn : ({
                  counter // steps counter
                , storage  //
                , name
                , flatData
                , breadcrumbs
                , edges


                }) => {

                }
    }
])
```