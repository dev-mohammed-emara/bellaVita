document.addEventListener('DOMContentLoaded', () => {
      let currentStep = 1;
      const totalSteps = 4;
      
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      const progressBar = document.getElementById('progressBar');
      const progressBarMobile = document.getElementById('progressBarMobile');
      const stepLabelMobile = document.getElementById('stepLabelMobile');
      const stepTitleMobile = document.getElementById('stepTitleMobile');
      
      const stepContents = [
        document.getElementById('stepContent-1'),
        document.getElementById('stepContent-2'),
        document.getElementById('stepContent-3'),
        document.getElementById('stepContent-4')
      ];
      
      const stepTitles = [
        'Personal Information',
        'Professional Details',
        'Ticket Selection',
        'Review Details'
      ];
      
      // Data variables
      let selectedCategory = '';
      let selectedAttendance = '';
      let selectedSessions = [];
      
      // Category selection
      const categoryCards = document.querySelectorAll('.category-card');
      categoryCards.forEach(card => {
        card.addEventListener('click', () => {
          categoryCards.forEach(c => {
            c.classList.remove('border-accent', 'bg-gradient-to-br', 'from-accent/10', 'to-secondary/5', 'shadow-lg');
            c.classList.add('border-border');
          });
          card.classList.remove('border-border');
          card.classList.add('border-accent', 'bg-gradient-to-br', 'from-accent/10', 'to-secondary/5', 'shadow-lg');
          selectedCategory = card.getAttribute('data-val');
          document.getElementById('reviewCategory').innerText = selectedCategory;
        });
      });
      
      // Attendance selection
      const attendanceCards = document.querySelectorAll('.attendance-card');
      attendanceCards.forEach(card => {
        card.addEventListener('click', () => {
          attendanceCards.forEach(c => {
            c.classList.remove('border-accent', 'bg-gradient-to-br', 'from-accent/10', 'to-secondary/5', 'shadow-lg');
            c.classList.add('border-border');
            const svg = c.querySelector('svg');
            if(svg) svg.remove();
          });
          card.classList.remove('border-border');
          card.classList.add('border-accent', 'bg-gradient-to-br', 'from-accent/10', 'to-secondary/5', 'shadow-lg');
          const checkIcon = ``;
          card.querySelector('.flex').insertAdjacentHTML('beforeend', checkIcon);
          selectedAttendance = card.getAttribute('data-val');
          
          document.getElementById('summaryPass').innerText = selectedAttendance;
          document.getElementById('reviewPass2').innerText = selectedAttendance;
        });
      });
      
      // Sessions selection
      const sessionCards = document.querySelectorAll('.session-card');
      sessionCards.forEach(card => {
        card.addEventListener('click', () => {
          const val = card.getAttribute('data-val');
          const checkBox = card.querySelector('.check-box');
          if(selectedSessions.includes(val)) {
            selectedSessions = selectedSessions.filter(s => s !== val);
            card.classList.remove('border-accent', 'bg-accent/5');
            card.classList.add('border-border');
            const svg = checkBox.querySelector('svg');
            if(svg) svg.classList.add('hidden');
            checkBox.classList.remove('bg-accent', 'border-accent');
            checkBox.classList.add('border-border');
          } else {
            selectedSessions.push(val);
            card.classList.remove('border-border');
            card.classList.add('border-accent', 'bg-accent/5');
            const svg = checkBox.querySelector('svg');
            if(svg) svg.classList.remove('hidden');
            checkBox.classList.remove('border-border');
            checkBox.classList.add('bg-accent', 'border-accent');
          }
          document.getElementById('summarySessions').innerText = `${selectedSessions.length} selected`;
          document.getElementById('reviewSessions').innerText = `${selectedSessions.length} selected`;
        });
      });
      
      // Terms checkbox validation
      const termsCheck = document.getElementById('termsCheck');
      if (termsCheck) {
        termsCheck.addEventListener('change', () => {
           if(currentStep === 4) {
             nextBtn.disabled = !termsCheck.checked;
           }
        });
      }
      
      const updateSummary = () => {
        const fname = document.getElementById('regFirstName') ? document.getElementById('regFirstName').value.trim() : '';
        const lname = document.getElementById('regLastName') ? document.getElementById('regLastName').value.trim() : '';
        const name = (fname || lname) ? `${fname} ${lname}`.trim() : '—';
        document.getElementById('summaryName').innerText = name;
        if(document.getElementById('reviewName2')) document.getElementById('reviewName2').innerText = name;
      };
      
      if (document.getElementById('regFirstName')) document.getElementById('regFirstName').addEventListener('input', updateSummary);
      if (document.getElementById('regLastName')) document.getElementById('regLastName').addEventListener('input', updateSummary);
      
      const validateStep = (step) => {
        if (step === 1) {
          const fname = document.getElementById('regFirstName').value.trim();
          const lname = document.getElementById('regLastName').value.trim();
          const email = document.getElementById('regEmail').value.trim();
          const phone = document.getElementById('regPhone').value.trim();
          const country = document.getElementById('regCountry').value;
          
          if (!fname || !lname || !email || !phone || !country) {
            Swal.fire({icon: 'warning', title: 'Missing Fields', text: 'Please fill out all required fields before proceeding.', confirmButtonColor: '#F8B995'});
            return false;
          }
          return true;
        }
        if (step === 2) {
          const title = document.getElementById('regTitle').value;
          const specialty = document.getElementById('regSpecialty').value.trim();
          const org = document.getElementById('regOrg').value.trim();
          if (!title || !specialty || !org || !selectedCategory) {
            Swal.fire({icon: 'warning', title: 'Missing Fields', text: 'Please fill out all required professional details and select a category.', confirmButtonColor: '#F8B995'});
            return false;
          }
          return true;
        }
        if (step === 3) {
          if (!selectedAttendance) {
            Swal.fire({icon: 'warning', title: 'Missing Fields', text: 'Please select an attendance type.', confirmButtonColor: '#F8B995'});
            return false;
          }
          return true;
        }
        return true;
      };
      
      window.goToStep = (step) => {
         currentStep = step;
         showStep(currentStep);
      };
      
      const showStep = (step) => {
        stepContents.forEach((content, idx) => {
          if (content) {
            if (idx === step - 1) {
              content.classList.remove('hidden');
            } else {
              content.classList.add('hidden');
            }
          }
        });
        
        if (step === 1) prevBtn.classList.add('hidden');
        else prevBtn.classList.remove('hidden');
        
        if (step === totalSteps) {
          nextBtn.innerText = 'Submit Registration';
          nextBtn.disabled = !termsCheck.checked;
        } else {
          nextBtn.innerText = 'Next Step';
          nextBtn.disabled = false;
        }
        
        for (let i = 1; i <= totalSteps; i++) {
          const badge = document.getElementById(`stepBadge-${i}`);
          const text = document.getElementById(`stepText-${i}`);
          const line = document.getElementById(`stepLine-${i}`);
          
          if (badge && text) {
            if (i < step) {
              badge.className = "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 bg-accent text-accent-foreground ring-4 ring-accent/10";
              badge.innerText = "✓";
              text.className = "mt-2 text-xs font-semibold text-foreground";
            } else if (i === step) {
              badge.className = "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 bg-accent text-accent-foreground ring-4 ring-accent/20";
              badge.innerText = i;
              text.className = "mt-2 text-xs font-semibold text-foreground";
            } else {
              badge.className = "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 bg-muted text-muted-foreground";
              badge.innerText = i;
              text.className = "mt-2 text-xs font-semibold text-muted-foreground";
            }
          }
          if (line) {
            if (i < step) line.className = "h-[2px] flex-1 transition-all duration-300 bg-accent";
            else line.className = "h-[2px] flex-1 transition-all duration-300 bg-border";
          }
        }
        
        const percentage = `${(step / totalSteps) * 100}%`;
        if (progressBar) progressBar.style.width = percentage;
        if (progressBarMobile) progressBarMobile.style.width = percentage;
        if (stepLabelMobile) stepLabelMobile.innerText = `Step ${step} of ${totalSteps}`;
        if (stepTitleMobile) stepTitleMobile.innerText = stepTitles[step - 1];
        
        const summaryProgressVal = document.getElementById('summaryProgressVal');
        const summaryProgressProgress = document.getElementById('summaryProgressProgress');
        if (summaryProgressVal) summaryProgressVal.innerText = percentage;
        if (summaryProgressProgress) summaryProgressProgress.style.width = percentage;
        
        if (step === 4) {
          const fname = document.getElementById('regFirstName') ? document.getElementById('regFirstName').value.trim() : '';
          const lname = document.getElementById('regLastName') ? document.getElementById('regLastName').value.trim() : '';
          const email = document.getElementById('regEmail') ? document.getElementById('regEmail').value.trim() : '';
          const phone = document.getElementById('regPhone') ? document.getElementById('regPhone').value.trim() : '';
          const country = document.getElementById('regCountry') ? document.getElementById('regCountry').value : '';
          
          const title = document.getElementById('regTitle') ? document.getElementById('regTitle').value : '';
          const specialty = document.getElementById('regSpecialty') ? document.getElementById('regSpecialty').value.trim() : '';
          const org = document.getElementById('regOrg') ? document.getElementById('regOrg').value.trim() : '';
          
          if(document.getElementById('reviewName2')) document.getElementById('reviewName2').innerText = `${fname} ${lname}`;
          if(document.getElementById('reviewEmail2')) document.getElementById('reviewEmail2').innerText = email;
          if(document.getElementById('reviewPhone2')) document.getElementById('reviewPhone2').innerText = phone;
          if(document.getElementById('reviewLocation2')) document.getElementById('reviewLocation2').innerText = country;
          
          if(document.getElementById('reviewTitle')) document.getElementById('reviewTitle').innerText = title;
          if(document.getElementById('reviewSpecialty2')) document.getElementById('reviewSpecialty2').innerText = specialty;
          if(document.getElementById('reviewOrg2')) document.getElementById('reviewOrg2').innerText = org;
          if(document.getElementById('reviewCategory')) document.getElementById('reviewCategory').innerText = selectedCategory;
          
          if(document.getElementById('reviewPass2')) document.getElementById('reviewPass2').innerText = selectedAttendance;
          if(document.getElementById('reviewSessions')) document.getElementById('reviewSessions').innerText = `${selectedSessions.length} selected`;
        }
      };
      
      nextBtn.addEventListener('click', () => {
        if (currentStep < totalSteps) {
          if (validateStep(currentStep)) {
            currentStep++;
            showStep(currentStep);
          }
        } else {
          // Final Submit
          const termsCheck = document.getElementById('termsCheck');
          if (termsCheck && !termsCheck.checked) {
            Swal.fire({
              icon: 'warning',
              title: 'Terms & Conditions',
              text: 'Please agree to the Terms and Conditions and Privacy Policy to complete your registration.',
              confirmButtonColor: '#FFBE98'
            });
            return;
          }
          
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: 'Redirecting to your QR code...',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            
            const fname = document.getElementById('regFirstName') ? document.getElementById('regFirstName').value.trim() : '';
            const lname = document.getElementById('regLastName') ? document.getElementById('regLastName').value.trim() : '';
            localStorage.setItem('bv_name', fname + ' ' + lname);
            localStorage.setItem('bv_attendance', selectedAttendance);
            localStorage.setItem('bv_sessions', selectedSessions.length + ' selected');
            
            // Generate a random ticket ID like BV2026-XXXXX
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let ticketId = 'BV2026-';
            for(let i=0; i<5; i++) ticketId += chars.charAt(Math.floor(Math.random() * chars.length));
            localStorage.setItem('bv_ticket', ticketId);
            
            window.location.href = './QR.html';

          });
        }
      });
      
      prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
          currentStep--;
          showStep(currentStep);
        }
      });
      
      showStep(1);
    });