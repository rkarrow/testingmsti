import { useState } from 'react'
import { FiX, FiMail, FiCheck, FiCopy, FiExternalLink, FiFileText } from 'react-icons/fi'

export default function CertificateModal({ isOpen, onClose }) {
  const [fullName, setFullName] = useState('')
  const [dob, setDob] = useState('')
  const [certList, setCertList] = useState([
    { name: '', number: '', issuedDate: '', expireDate: '' }
  ])
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleAddCert = () => {
    setCertList([...certList, { name: '', number: '', issuedDate: '', expireDate: '' }])
  }

  const handleCertChange = (index, field, value) => {
    const updated = [...certList]
    updated[index][field] = value
    setCertList(updated)
  }

  const handleRemoveCert = (index) => {
    if (certList.length === 1) return
    setCertList(certList.filter((_, i) => i !== index))
  }

  const generateEmailBody = () => {
    const nameStr = fullName.trim() || '[Your Full Name]'
    const dobStr = dob.trim() || '[DD/MM/YYYY]'
    
    let certsTable = ''
    const validCerts = certList.filter(c => c.name.trim() || c.number.trim())
    
    if (validCerts.length > 0) {
      certsTable = validCerts.map((c, i) => 
        `Certificate ${i + 1}:\n- Certificate: ${c.name || 'N/A'}\n- Certificate Number: ${c.number || 'N/A'}\n- Issued Date: ${c.issuedDate || 'N/A'}\n- Expire Date: ${c.expireDate || 'Never Expires'}\n`
      ).join('\n')
    } else {
      certsTable = `Certificate Details:\n- Advanced Fire Fighting | No: 50014/09-2024/0003 | Issued: 03/01/2025 | Exp: 03/01/2030\n- Medical First Aid | No: 50017/01-2025/0004 | Issued: 10/01/2025 | Exp: 10/01/2030\n- Engine Room Simulator | No: 50066/01-2025/0004 | Issued: 20/02/2025 | Exp: Never Expires\n- Marine High Voltage Course | No: EED-2485/089/0040 | Issued: 17/04/2025 | Exp: Never Expires\n`
    }

    return `Dear Nimasha,

Good day!

Could you please verify the authentication of the following certificates issued by Mercantile Seaman Training Institute at the earliest possible.

Full Name - ${nameStr}
D.O.B – ${dobStr}

${certsTable}
Copies of the Certificates are attached for your easy reference.

Thank you.`
  }

  const handleOpenEmail = () => {
    const subject = encodeURIComponent(`Certificate Verification Request - ${fullName.trim() || 'Student Verification'}`)
    const body = encodeURIComponent(generateEmailBody())
    window.location.href = `mailto:certificate@msti.lk?subject=${subject}&body=${body}`
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generateEmailBody())
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-navy-950 border border-navy-800 rounded-2xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative my-8 text-left max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-navy-400 hover:text-white p-2 rounded-lg bg-navy-900/50 hover:bg-navy-800 transition-colors"
        >
          <FiX size={20} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-navy-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <FiFileText size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Certificate Verification</h2>
            <p className="text-xs text-navy-400">Official Mercantile Seaman Training Institute Verification Desk</p>
          </div>
        </div>

        {/* Official Notice Box */}
        <div className="bg-blue-600/10 border border-blue-500/30 rounded-xl p-4 text-xs leading-relaxed text-blue-200">
          <p className="font-semibold text-white mb-1">📢 Notice for Students & Employers:</p>
          <p className="italic text-blue-100">
            “Dear Students, To verify your certificates, please send an email to{' '}
            <a href="mailto:certificate@msti.lk" className="text-amber-400 underline font-semibold">
              certificate@msti.lk
            </a>
            . Thank you.”
          </p>
        </div>

        {/* Quick Fill Form */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Verification Template Auto-fill (Optional)
            </h3>
            <span className="text-[11px] text-navy-400">Fill details or send directly</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-navy-300 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="e.g. Opatha Arachchi Kankanamge Tehan"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-navy-900 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white placeholder:text-navy-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-navy-300 mb-1">Date of Birth (D.O.B)</label>
              <input
                type="text"
                placeholder="e.g. 11/12/1998"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-navy-900 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white placeholder:text-navy-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Certificate Items */}
          <div className="space-y-2 pt-2">
            <label className="block text-[11px] font-medium text-navy-300">
              Certificates to Verify:
            </label>
            {certList.map((cert, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-2 bg-navy-900/60 p-2.5 rounded-lg border border-navy-800">
                <input
                  type="text"
                  placeholder="Certificate Name (e.g. Advanced Fire Fighting)"
                  value={cert.name}
                  onChange={(e) => handleCertChange(index, 'name', e.target.value)}
                  className="bg-navy-950 border border-navy-800 rounded px-2.5 py-1.5 text-xs text-white placeholder:text-navy-500 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Cert No (e.g. 50014/09-2024)"
                  value={cert.number}
                  onChange={(e) => handleCertChange(index, 'number', e.target.value)}
                  className="bg-navy-950 border border-navy-800 rounded px-2.5 py-1.5 text-xs text-white placeholder:text-navy-500 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Issued (e.g. 03/01/2025)"
                  value={cert.issuedDate}
                  onChange={(e) => handleCertChange(index, 'issuedDate', e.target.value)}
                  className="bg-navy-950 border border-navy-800 rounded px-2.5 py-1.5 text-xs text-white placeholder:text-navy-500 focus:outline-none focus:border-blue-500"
                />
                <div className="flex gap-1">
                  <input
                    type="text"
                    placeholder="Expiry / Never Expires"
                    value={cert.expireDate}
                    onChange={(e) => handleCertChange(index, 'expireDate', e.target.value)}
                    className="flex-1 bg-navy-950 border border-navy-800 rounded px-2.5 py-1.5 text-xs text-white placeholder:text-navy-500 focus:outline-none focus:border-blue-500"
                  />
                  {certList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveCert(index)}
                      className="text-red-400 hover:text-red-300 px-2 py-1"
                      title="Remove"
                    >
                      <FiX size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddCert}
              className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 mt-1"
            >
              + Add another certificate
            </button>
          </div>
        </div>

        {/* Email Preview Box */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-navy-400">
            <span>Email Draft Preview (Recipient: certificate@msti.lk)</span>
            <button
              onClick={handleCopy}
              className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
            >
              {copied ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
              {copied ? 'Copied to Clipboard!' : 'Copy Text'}
            </button>
          </div>
          <pre className="bg-navy-900 border border-navy-800 rounded-xl p-3.5 text-xs font-mono text-navy-200 whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
            {generateEmailBody()}
          </pre>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-navy-800 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleOpenEmail}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 px-5 rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
          >
            <FiMail size={16} /> Open in Email App (Auto-filled)
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="bg-navy-900 hover:bg-navy-850 text-navy-200 hover:text-white font-semibold text-xs py-3 px-5 rounded-xl border border-navy-800 flex items-center justify-center gap-2 transition-all"
          >
            {copied ? <FiCheck className="text-emerald-400" size={16} /> : <FiCopy size={16} />}
            {copied ? 'Copied' : 'Copy Template'}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-navy-900 hover:bg-navy-850 text-navy-400 hover:text-white text-xs py-3 px-4 rounded-xl border border-navy-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
