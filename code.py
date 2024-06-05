#! /usr/bin/env python3

import chipwhisperer as cw
import numpy as np
import matplotlib.pyplot as plt
import time
import os
import sys
from server import Device
from server import WorkBench

local_config = dict()
wb = WorkBench(local_config.get('workbench', dict()),0)

wb.upload_firmware('test.hex') # Modify if you want to target another implementation

wb.reset()

digit_0_guessed = 0
digit_1_guessed = 0
digit_2_guessed = 0
digit_3_guessed = 0
epsilon = 0.15
g_for_great = False


code_tested = str(0) + str(0) + str(0) + str(0)
#wb.write('c')
#wb.arm()
#wb.write(code_tested)
#wb.capture()
#wb.read(50)
#trace = wb.get_last_trace()

#peak_index = np.argmax(np.abs(trace[200:400])) # Select bounds
#print(peak_index)
for digit_tested in range(10):
    code_tested = str(digit_tested) + str(0) + str(0) + str(0)# Choose a code to test
    wb.write('c')
    wb.arm()
    wb.write(code_tested)
    wb.capture()
    wb.read(50)
    trace = wb.get_last_trace()
    # Write the code for digit verification below
    new_peak_index = np.argmax(np.abs(trace[200:400]))
    #print(new_peak_index)
    if (abs(trace[new_peak_index]) < epsilon):
        digit_0_guessed = digit_tested
        g_for_great = True
        break
    if (digit_tested != 0 and new_peak_index > peak_index):
        digit_0_guessed = digit_tested
        break
    if (digit_tested != 0 and new_peak_index < peak_index):
        digit_0_guessed = digit_tested - 1
        break
    peak_index = new_peak_index


code_tested = str(digit_0_guessed) + str(0) + str(0) + str(0) # Choose the first code to test
#wb.write('c')
#wb.arm()
#wb.write(code_tested)
#wb.capture()
#wb.read(50)
#trace = wb.get_last_trace()
#peak_index = np.argmax(np.abs(trace[200:400])) # Select bounds

for digit_tested in range(10):
    code_tested =  str(digit_0_guessed) + str(digit_tested) + str(0) + str(0) #Choose a code to test
    wb.write('c')
    wb.arm()
    wb.write(code_tested)
    wb.capture()
    wb.read(50)
    trace = wb.get_last_trace()
    # Write the code for digit verification below
    #trace = list(map(abs, trace))
    new_peak_index = np.argmax(np.abs(trace[200:400]))
    if (abs(trace[new_peak_index]) < epsilon or g_for_great):
        digit_1_guessed = digit_tested
        g_for_great = True
        print(new_peak_index)
        print(trace[200:400])

        break
    if (digit_tested != 0 and new_peak_index > peak_index):
        digit_1_guessed = digit_tested
        break
    if (digit_tested != 0 and new_peak_index < peak_index):
        digit_1_guessed = digit_tested - 1
        break
    peak_index = new_peak_index

    

code_tested = str(digit_0_guessed) + str(digit_1_guessed) + str(0) + str(0) # Choose the first code to test
#wb.write('c')
#wb.arm()
#wb.write(code_tested)
#wb.capture()
#wb.read(50)
#trace = wb.get_last_trace()
#peak_index = np.argmax(np.abs(trace[200:400])) # Select bounds

for digit_tested in range(10):
    code_tested = str(digit_0_guessed) + str(digit_1_guessed) + str(digit_tested) + str(0) # Choose a code to test
    wb.write('c')
    wb.arm()
    wb.write(code_tested)
    wb.capture()
    wb.read(50)
    trace = wb.get_last_trace()
    # Write the code for digit verification below
    #trace = list(map(abs, trace))
    new_peak_index = np.argmax(np.abs(trace[200:400]))
    if (abs(trace[new_peak_index]) < epsilon or g_for_great):
        digit_2_guessed = digit_tested
        g_for_great = True
        break
    if (digit_tested != 0 and new_peak_index > peak_index):
        digit_2_guessed = digit_tested
        break
    if (digit_tested != 0 and new_peak_index < peak_index):
        digit_2_guessed = digit_tested - 1
        break
    peak_index = new_peak_index

    

code_tested = str(digit_0_guessed) + str(digit_1_guessed) + str(digit_2_guessed) + str(0) # Choose the first code to test
#wb.write('c')
#wb.arm()
#wb.write(code_tested)
#wb.capture()
#wb.read(50)
#trace = wb.get_last_trace()
#peak_index = np.argmax(np.abs(trace[200:400])) # Select bounds

for digit_tested in range(10):
    code_tested = str(digit_0_guessed) + str(digit_1_guessed) + str(digit_2_guessed) + str(digit_tested) # Choose a code to test
    wb.write('c')
    wb.arm()
    wb.write(code_tested)
    wb.capture()
    wb.read(50)
    trace = wb.get_last_trace()
    # Write the code for digit verification below
    # trace = list(map(abs, trace))
    new_peak_index = np.argmax(np.abs(trace[200:400]))
    if (abs(trace[new_peak_index]) < epsilon or g_for_great):
        digit_3_guessed = digit_tested
        g_for_great = True
        break
    if (digit_tested != 0 and new_peak_index > peak_index):
        digit_3_guessed = digit_tested
        break
    if (digit_tested != 0 and new_peak_index < peak_index):
        digit_3_guessed = digit_tested - 1
        break
    peak_index = new_peak_index

    

# final test

code_guessed = str(digit_0_guessed) + str(digit_1_guessed) + str(digit_2_guessed) + str(digit_3_guessed)

print('Code found: ' + code_guessed)
print('Test')

wb.write('c')
wb.write(code_guessed)
print(wb.read(50))
