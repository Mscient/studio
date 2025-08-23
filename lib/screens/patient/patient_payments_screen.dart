import 'package:flutter/material.dart';

class PatientPaymentsScreen extends StatelessWidget {
  const PatientPaymentsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Payments'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Transaction History',
              style: Theme.of(context).textTheme.headline6,
            ),
            const SizedBox(height: 16.0),
            Expanded(
              child: ListView.builder(
                itemCount: 5, // Placeholder for number of transactions
                itemBuilder: (context, index) {
                  return Card(
                    margin: const EdgeInsets.symmetric(vertical: 8.0),
                    child: ListTile(
                      title: Text('Transaction ${index + 1}'),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: const [
                          Text('Date: YYYY-MM-DD'), // Placeholder Date
                          Text('Amount: \$XX.XX'), // Placeholder Amount
                          Text('Status: Success'), // Placeholder Status
                        ],
                      ),
                      trailing: TextButton(
                        onPressed: () {
                          // TODO: Implement Invoice button action
                        },
                        child: const Text('Invoice'),
                      ),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 24.0),
            ElevatedButton(
              onPressed: () {
                // TODO: Implement Make Payment flow initiation
              },
              child: const Text('Make a New Payment'),
              style: ElevatedButton.styleFrom(
                minimumSize: const Size.fromHeight(50), // Full width button
              ),
            ),
          ],
        ),
      ),
    );
  }
}