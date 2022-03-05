import 'package:flutter/material.dart';

Dismissible dismiss({required Widget widget, required Function onDismissed}) {
  return Dismissible(
    background: Container(
      decoration: BoxDecoration(
          color: Colors.red[300],
          boxShadow: [
            BoxShadow(
                color: Colors.red.withOpacity(0.5),
                spreadRadius: 5,
                blurRadius: 7,
                offset: const Offset(0, 3)),
          ],
          borderRadius: const BorderRadius.all(Radius.circular(5))),
    ),
    key: ObjectKey(widget),
    child: widget,
    direction: DismissDirection.endToStart,
    onDismissed: (DismissDirection direction) {
      onDismissed();
    },
  );
}
