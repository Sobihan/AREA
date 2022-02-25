import 'package:area/Models/user.dart';
import 'package:flutter/material.dart';

class Numbers extends StatefulWidget {
  final User user;
  const Numbers({Key? key, required this.user}) : super(key: key);

  @override
  _NumbersState createState() => _NumbersState();
}

class _NumbersState extends State<Numbers> {
  Widget buildNumber(int nb, String name) {
    return MaterialButton(
      padding: const EdgeInsets.symmetric(vertical: 4),
      onPressed: () {},
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Text(nb.toString(),
              style:
                  const TextStyle(fontWeight: FontWeight.bold, fontSize: 24)),
          const SizedBox(height: 2),
          Text(name, style: const TextStyle(fontWeight: FontWeight.bold))
        ],
      ),
    );
  }

  int getNumbersOfService() {
    int nb = 0;
    if (widget.user.isGoogle) nb += 1;
    if (widget.user.isReddit) nb += 1;
    return nb;
  }

  @override
  Widget build(BuildContext context) {
    int nbService = getNumbersOfService();
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        buildNumber(nbService, nbService == 0 ? "Service" : "Services"),
      ],
    );
  }
}
