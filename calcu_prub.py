#iniciando con una calculadora simple 
#Versión inicial del proyecto
while True:
    operacion = input("Ingrese la operacion: ")

    if operacion.lower() == "salir":
        print("Hasta pronto!!")
        break #Aqui se saldra del bucle

    try:
        num1 = float(input("Ingrese el primer numero: "))
        num2 = float(input("Ingrese el segundo numero: "))
    except ValueError:
        print("Error: Debes ingresar numeros validos")
        continue

    if operacion.lower() == "sumar":
        resultado = num1 + num2
        print(f" {num1} + {num2} = {resultado}")
    elif operacion.lower() == "restar":
        resultado = num1 - num2
        print(f" {num1} - {num2} = {resultado}")
    elif operacion.lower() == "multiplicar":
        resultado = num1 * num2
        print(f" {num1} * {num2} = {resultado}")
    elif operacion.lower() == "dividir":
        if num2 !=0: #Aqui se evitara la division por cero
            resultado = num1 / num2
            print(f" {num1} / {num2} = {resultado}")
        else:
            print("Error: No se puede dividir por cero")
    else:
        print("Operacion no valida")
    
