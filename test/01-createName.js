
import { expect } from "chai"
import createName from "../src/createName.js"


describe ( "Test a function 'createName'", () => {

   it ('should create a name', () => {
                const name = createName ()
                expect ( name ).to.be.a('string')                
        }) // it should create a name

    it ('should create a name with prefix', () => {
                const 
                      pr = 'some_prefix___'
                    , name = createName ( pr )
                    ;
                expect ( name ).to.be.a('string')
                expect ( name ).to.match( new RegExp(`^${pr}`))
        }) // it should create a name with prefix


    it ( 'should create a name with max length', () => {  
                const 
                      max = 4
                    , name = createName ( null, max )
                expect ( name ).to.be.a('string')
                expect ( name.length ).to.be.equal ( max )
        }) // it should create a name with max length



    it ( 'should create a name with prefix and max length', () => {
                const 
                      pr = 'some_prefix___'
                    , max = 4
                    , name = createName ( pr, max )
                    ;
                expect ( name ).to.be.a('string')
                expect ( name ).to.match( new RegExp(`^${pr}`))
                expect ( name.length ).to.be.equal ( max + pr.length ) // max doesn't include prefix length
        }) // it should create a name with prefix and max length

 }) // describe