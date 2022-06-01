# Logic
(1) Make multiple calculation before pressing the equal key
Type up number (first number):
- On each digit pressed, display each digit as they are typed
Click operator key (first time):
- Store the first number into accumulator
- Store the operator pressed
- Light up the operator key
Type up number (subsequent number):
- On first digit pressed: clear display of previous number and replace with first digit, clear up lighting on operator key
- On each digit pressed, display each digit as they are typed
Click operator key (subsequent time):
- Update the accumulator
    - Use the current operator stored to operate on the current accumulator and current number
- Display the accumulator
- Store the operator pressed
- Light up the operator key
Type up number (subsequent number)
Press equal sign:
- Update the accumulator
    - Use the current operator stored to operate on the current accumulator and current number
- Set operator to null
- Display the accumulator

(2a) Make new calculation
Type up number (first number after pressing the equal sign):
- On first digit pressed: clear display of previous number and replace with first digit
- On each digit pressed, display each digit as they are typed
Click operator key (first time)
Type up number (subsequent number)
...

(2b) Continue calculation with previous result
Click operator key (first time after pressing the equal sign)
Type up number (subsequent number)
...

## Summary
Type up number:
- Clear up any lightings on operator keys
- If first digit pressed (newNumber = True): 
    - Clear display of previous number and replace with first digit
    - Set newNumber = False
    - If equalPressed
        - Set flag that this starts a new calculation (firstCalc = True)
        - equalPressed = False
- On each digit pressed, display each digit as they are typed

Click operator key:
- equalPressed = False
- If first calculation (firstCalc = True):
    - Store the number into accumulator
    - set firstCalc = False
- Else
    - Update the accumulator
        - Use the current operator stored to operate on the current accumulator and current number
    - Display the accumulator
- Store the operator pressed
- Set state of calculator to enter next number (newNumber = True)
- Light up the operator key

Press equal sign:
- Update the accumulator
    - Use the current operator stored to operate on the current accumulator and current number
- Set operator to null
- Set state of calculator to enter next number (newNumber = True)
- Flag to allow for new calculation if user pressed a number button next (equalPressed = True)
- Display the accumulator

Press clear button:
- firstCalc = True
