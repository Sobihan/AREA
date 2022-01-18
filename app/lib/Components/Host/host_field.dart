import 'package:flutter/material.dart';
import '../../Pages/login_page.dart';

AlertDialog getMyAlert(BuildContext context) {
  TextEditingController controller = TextEditingController();
  return AlertDialog(
      title: const Text("HOST"),
      content: SingleChildScrollView(
          child: ListBody(
        children: <Widget>[
          TextFormField(
            controller: controller,
            decoration: const InputDecoration(labelText: "Host"),
            validator: (value) {
              if (value!.isEmpty) {
                return ("Host is missing");
              }
              return null;
            },
          ),
          ElevatedButton(
            child: const Text("Confirm"),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => LoginPage(host: controller.text)),
              );
            },
          )
        ],
      )));
}
