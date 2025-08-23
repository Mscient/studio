import 'package:flutter/material.dart';

class PatientAuthScreen extends StatefulWidget {
  const PatientAuthScreen({Key? key}) : super(key: key);

  @override
  _PatientAuthScreenState createState() => _PatientAuthScreenState();
}

class _PatientAuthScreenState extends State<PatientAuthScreen> {
  int _selectedIndex = 0; // 0 for Patient Login, 1 for Doctor Login

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Center(
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: <Widget>[
                // Logo and App Name
                Column(
                  children: [
                    Icon(Icons.health_and_safety, size: 80, color: Colors.blue), // Placeholder Icon
                    SizedBox(height: 8),
                    Text(
                      'Healthcare Super-App',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(height: 32),
                  ],
                ),

                // Segmented Tabs
                Container(
                  decoration: BoxDecoration(
                    color: Colors.grey[200],
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                  child: ToggleButtons(
                    isSelected: [_selectedIndex == 0, _selectedIndex == 1],
                    onPressed: (int index) {
                      setState(() {
                        _selectedIndex = index;
                      });
                    },
                    borderRadius: BorderRadius.circular(8.0),
                    selectedColor: Colors.white,
                    fillColor: Colors.blue,
                    color: Colors.black,
                    constraints: BoxConstraints.expand(
                      width: (MediaQuery.of(context).size.width - 32) / 2,
                      height: 40,
                    ),
                    children: <Widget>[
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0),
                        child: Text('Patient Login'),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0),
                        child: Text('Doctor Login'),
                      ),
                    ],
                  ),
                ),
                SizedBox(height: 24),

                // Form Fields (Placeholder for Patient)
                if (_selectedIndex == 0) ...[
                  TextField(
                    decoration: InputDecoration(
                      labelText: 'Name',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8.0),
                      ),
                    ),
                  ),
                  SizedBox(height: 16),
                  TextField(
                    keyboardType: TextInputType.number,
                    decoration: InputDecoration(
                      labelText: 'Age',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8.0),
                      ),
                    ),
                  ),
                  SizedBox(height: 16),
                  Row(
                    children: [
                      Expanded(child: Text('Gender:')),
                      Expanded(
                        flex: 2,
                        child: Row(
                          children: [
                            Radio<String>(value: 'Male', groupValue: 'gender', onChanged: (value) {}),
                            Text('Male'),
                            Radio<String>(value: 'Female', groupValue: 'gender', onChanged: (value) {}),
                            Text('Female'),
                            Radio<String>(value: 'Other', groupValue: 'gender', onChanged: (value) {}),
                            Text('Other'),
                          ],
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 16),
                  TextField(
                    keyboardType: TextInputType.emailAddress,
                    decoration: InputDecoration(
                      labelText: 'Phone/Email',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8.0),
                      ),
                    ),
                  ),
                  SizedBox(height: 16),
                  TextField(
                    decoration: InputDecoration(
                      labelText: 'Government ID',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8.0),
                      ),
                    ),
                  ),
                  SizedBox(height: 24),

                  // Login and Register Buttons
                  ElevatedButton(
                    onPressed: () {
                      // TODO: Implement Login logic
                    },
                    style: ElevatedButton.styleFrom(
                      padding: EdgeInsets.symmetric(vertical: 16),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8.0),
                      ),
                    ),
                    child: Text('Login'),
                  ),
                  SizedBox(height: 16),
                  TextButton(
                    onPressed: () {
                      // TODO: Implement Registration logic
                    },
                    child: Text('Register'),
                  ),
                ],

                // Placeholder for Doctor Login Fields (when _selectedIndex is 1)
                if (_selectedIndex == 1) ...[
                  // Placeholder fields for Doctor Login
                  TextField(
                    decoration: InputDecoration(
                      labelText: 'Doctor ID or Email',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8.0),
                      ),
                    ),
                  ),
                  SizedBox(height: 16),
                  TextField(
                    obscureText: true,
                    decoration: InputDecoration(
                      labelText: 'Password',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8.0),
                      ),
                    ),
                  ),
                   SizedBox(height: 24),
                   ElevatedButton(
                    onPressed: () {
                      // TODO: Implement Doctor Login logic
                    },
                    style: ElevatedButton.styleFrom(
                      padding: EdgeInsets.symmetric(vertical: 16),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8.0),
                      ),
                    ),
                    child: Text('Doctor Login'),
                  ),
                ],

                // Placeholder for Error Messages
                SizedBox(height: 16),
                Text(
                  '', // Placeholder for error message
                  style: TextStyle(color: Colors.red),
                ),

                // Placeholder for Forgot Password and Terms & Privacy
                SizedBox(height: 16),
                Align(
                  alignment: Alignment.centerRight,
                  child: TextButton(
                    onPressed: () {
                      // TODO: Implement Forgot Password logic
                    },
                    child: Text('Forgot Password?'),
                  ),
                ),
                SizedBox(height: 16),
                Align(
                  alignment: Alignment.center,
                  child: TextButton(
                    onPressed: () {
                      // TODO: Implement Terms & Privacy logic
                    },
                    child: Text('Terms & Privacy'),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}