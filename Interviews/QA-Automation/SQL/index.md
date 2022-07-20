#### MySQL:

### What are Constraints in SQL?
Constraints are used to specify the rules concerning data in the table.\
It can be applied for single or multiple fields in an SQL table during the **creation** of the table or after creating using the ALTER TABLE command. 
The constraints are:

**NOT NULL** - Restricts NULL value from being inserted into a column.\
**CHECK** - Verifies that all values in a field satisfy a condition.\
**DEFAULT** - Automatically assigns a default value if no value has been specified for the field.\
**UNIQUE** - Ensures unique values to be inserted into the field.\
**INDEX** - Indexes a field providing faster retrieval of records.\
**PRIMARY KEY** - Uniquely identifies each record in a table.\
**FOREIGN KEY** - Ensures referential integrity for a record in another table.

###What are Aggregate and Scalar functions?
An aggregate function performs operations on a collection of values to return a single scalar value.\
Aggregate functions are often used with the **GROUP BY** and **HAVING** clauses of the **SELECT** statement.\
Following are the widely used SQL aggregate functions:

**AVG()** - Calculates the mean of a collection of values.\
**COUNT()** - Counts the total number of records in a specific table or view.\
**MIN()** - Calculates the minimum of a collection of values.\
**MAX()** - Calculates the maximum of a collection of values.\
**SUM()** - Calculates the sum of a collection of values.\
**FIRST()** - Fetches the first element in a collection of values.\
**LAST()** - Fetches the last element in a collection of values.\
Note: All aggregate functions described above ignore NULL values except for the COUNT function.

A scalar function returns a **single value** based on the input value. Following are the widely used SQL scalar functions:\
**LEN()** - Calculates the total length of the given field (column).\
**UCASE()** - Converts a collection of string values to uppercase characters.\
**LCASE()** - Converts a collection of string values to lowercase characters.\
**MID()** - Extracts substrings from a collection of string values in a table.\
**CONCAT()** - Concatenates two or more strings.\
**RAND()** - Generates a random collection of numbers of a given length.\
**ROUND()** - Calculates the round-off integer value for a numeric field (or decimal point values).\
**NOW()** - Returns the current date & time.\
**FORMAT()** - Sets the format to display a collection of values.

